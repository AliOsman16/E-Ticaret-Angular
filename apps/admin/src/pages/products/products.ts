import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { Error } from '../../../../../library/shared/src/services/error';
import { ProductModel } from '@shared/models/product.model';
import { CategoryModel } from '@shared/models/category.model'


@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(() => "api/products")
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.error() ? false : this.result.isLoading());

  readonly categoryResult = httpResource<CategoryModel[]>(() => "api/categories");
  readonly categoryFilter = computed<FlexiGridFilterDataModel[]>(() => {
    const categories = this.categoryResult.value() ?? [];
    return categories.map<FlexiGridFilterDataModel>(
      (val) => 
        ({name: val.name, value: val.name}))
  });
  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);
  readonly #error = inject(Error);

  delete(id:string){
    this.#toast.showSwal("Ürünü Sil?","Ürünü silmek istiyor musunuz?","Sil",()=>{
      this.#http.delete(`api/products/${id}`).subscribe({
        next: () =>{
          this.#toast.showToast("Başarılı","Ürün başarıyla silindi!","success");
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)       
      });
    });
  }

}
