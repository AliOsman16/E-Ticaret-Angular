import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank/blank';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '@shared/models/product.model';
import { CategoryModel } from '@shared/models/category.model';
import { FlexiSelectModule } from 'flexi-select';
import { BreadcrumbModel } from '../../layouts/breadcrumb';


@Component({
  imports: [Blank, FormsModule, NgxMaskDirective, FlexiSelectModule],
  templateUrl: './product-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly result = resource({
    params: () => this.id(),
    loader: async ()=> {
      var res = await lastValueFrom(this.#http.get<ProductModel>(`api/products/${this.id()}`));
      this.breadcrumps.update(prev => [...prev,
          {title: res.name, url: `/product/edit/${this.id()}`, icon: 'box_edit'}]);
      return res;
    }
  });
  readonly data = linkedSignal(() => this.result.value()?? {...initialProduct});
  readonly title = computed(()=> this.id() ? "Ürün Güncelle": "Ürün Ekle");
  readonly btnName = computed(()=> this.id() ? " Güncelle": "Kaydet");
  readonly breadcrumps = signal<BreadcrumbModel[]>([
    {title: 'Ürünler', url: '/product', icon: 'inventory_2'}
  ]);


  readonly categoryResult = httpResource<CategoryModel[]>(() => "api/categories");
  readonly categoryData = computed(() => this.categoryResult.value() ?? []);
  readonly categoryLoading = computed(() => this.categoryResult.isLoading());

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);
  

  constructor(){
    this.#activate.params.subscribe(res =>{
      if(res["id"]){
        this.id.set(res["id"])
      }else{
        this.breadcrumps.update(prev => [...prev,
          {title: 'Ürün Ekle', url: '/products/create', icon: 'box_add'}
        ]);
      }
    })
  }

  save(form: NgForm){
    if(!form.valid) return;

    if(!this.id()){
      this.#http.post("api/products",this.data()).subscribe(()=>{
      this.#toast.showToast("Başarılı","Ürün başarıyla eklendi.","success");
      this.#router.navigateByUrl("/products");
      
    })
    }else{
      this.#http.put(`api/products/${this.id()}`,this.data()).subscribe(()=>{
      this.#toast.showToast("Başarılı","Ürün başarıyla güncellendi.","info");
      this.#router.navigateByUrl("/products");
      
    })
    }
  }

  setCategoryName(){
    const id = this.data().categoryId;
    const category = this.categoryData().find(p => p.id == id);
    this.data.update((prev) => ({...prev,categoryName:category?.name ?? ""}))
  }
 
}
