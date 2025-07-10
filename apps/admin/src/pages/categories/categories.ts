import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridModule } from "flexi-grid";
import { HttpClient, httpResource } from '@angular/common/http';
import { ProductModel } from '../products/products';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { Error } from '../../services/error';

export interface CategoryModel {
  id?: string;
  name: string;
}

export const initialCategory: CategoryModel = {
  name: ""
}

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './categories.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Categories {
  readonly result = httpResource<CategoryModel[]>(() => "api/categories");
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #error = inject(Error);


  delete(id: string) {
    this.#toast.showSwal("Kategori Sil?", "Kategoriyi silmek istiyor musunuz?", "Sil", () => {
      this.#http.delete(`api/categories/${id}`).subscribe({
        next: () => {
          this.#toast.showToast("Başarılı", "Kategori başarıyla silindi!", "success");
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)
      });
    }

    )
  }
}
