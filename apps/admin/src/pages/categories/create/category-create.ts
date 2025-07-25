import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank/blank';
import { FlexiToastService } from 'flexi-toast';
import { CategoryModel, initialCategory } from '@shared/models/category.model';
import { lastValueFrom } from 'rxjs';
import { BreadcrumbModel } from '../../layouts/breadcrumb';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './category-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CategoryCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly data = computed(() => this.result.value() ?? {...initialCategory});
  readonly title = computed(()=> this.id() ? "Kategori Güncelle": "Kategori Ekle");
  readonly btnName = computed(()=> this.id() ? " Güncelle": "Kaydet");
  readonly breadcrumps = signal<BreadcrumbModel[]>([
      {title: 'Kategoriler', url: '/categories', icon: 'category'}
    ]);

  readonly result = resource({
    params: () => this.id(),
    loader: async ()=> {
      var res = await lastValueFrom(this.#http.get<CategoryModel>(`api/categories/${this.id()}`));
      this.breadcrumps.update(prev => [...prev,
          {title: res.name, url: `/categories/edit/${this.id()}`, icon: 'edit'}]);
      return res;
    }
  });

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);

  constructor(){
    this.#activate.params.subscribe((res)=>{
      if(res['id']){
        this.id.set(res['id']);
      }else{
        this.breadcrumps.update(prev => [...prev,
          {title: 'Kategori Ekle', url: '/categories/create', icon: 'format_list_bulleted_add'}
        ]);
      }
    })
  }

  save(form: NgForm){
    if(!form.valid) return;

    if(!this.id()){
      this.#http.post("api/categories",this.data()).subscribe(()=>{
        this.#toast.showToast("Başarılı","Kategori başarıyla eklendi!","success");
        this.#router.navigateByUrl("/categories");
        
      })
    }else{
      this.#http.put(`api/categories/${this.id()}`,this.data()).subscribe(()=>{
        this.#toast.showToast("Başarılı","Kategori başarıyla güncellendi!","info");
        this.#router.navigateByUrl("/categories");
        
      })
    }
  }
}
