import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { CategoryModel } from '../categories/categories';
import { Error } from '../../services/error';

export interface ProductModel{
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
}

export const initialProduct: ProductModel = {
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "123",
  categoryName: "Telefon"
}

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
