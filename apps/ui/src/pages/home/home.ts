import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ProductModel } from '@shared/models/product.model';
import { BasketModel } from '@shared/models/basket.model';
import { TrCurrencyPipe } from 'tr-currency';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../services/common';
import { FlexiToastService } from 'flexi-toast';
import { Error } from '@shared/services/error';

@Component({
  imports: [TrCurrencyPipe, InfiniteScrollDirective],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  readonly placeholderCount = signal<number[]>([1, 2, 3]);
  readonly categoryUrl = signal<string | undefined>(undefined);
  readonly limit = signal<number>(9);
  readonly start = signal<number>(0);
  readonly result = httpResource<ProductModel[]>(() => {
    let endpoint = `api/products?`;
    if (this.categoryUrl()) {
      endpoint += `categoryUrl=${this.categoryUrl()}&`;
    }
    endpoint += `_limit=${this.limit()}&_start=${this.start()}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly dataSignal = signal<ProductModel[]>([]);
  readonly loading = linkedSignal(() => this.result.isLoading());

  readonly user = computed(() => this.#common.user());

  readonly #http = inject(HttpClient);
  readonly #activated = inject(ActivatedRoute);
  readonly #common = inject(Common);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #error = inject(Error);

  constructor() {
    this.#activated.params.subscribe((res) => {
      this.start.set(0);
      this.dataSignal.set([]);
      if (res[`categoryUrl`]) {
        this.categoryUrl.set(res[`categoryUrl`]);
      } else {
        this.categoryUrl.set(undefined);
      }
    });

    effect(() => {
      if (this.start() === 0) {
        this.dataSignal.set(this.data());
      } else if (this.result.value()) {
        this.dataSignal.update((prev) => [...prev, ...this.data()]);
      }
    });
  }

  onScroll() {
    if (this.start() >= 10) return; //bu kısım ürün sayısına göre manuel yapıldı backend olmadığı için json server yüzünden olmadı. Daha sonra ÇÖZÜLECEK!!!
    this.limit.update((prev) => prev + 9);
    this.start.update((prev) => prev + 9);
  }
  signInAlert() {
    this.#toast.showSwal(
      'Giriş Yap',
      'Sepete eklemek için giriş yapmalısın!',
      'Giriş Yap',
      () => {
        setTimeout(() => {
          this.#router.navigateByUrl('/auth/login');
        }, 200);
      }
    );
  }

  addBasket(data: ProductModel){
    const basket: BasketModel= {
      productId: data.id!,
      productName: data.name,
      price: data.price,
      quantity: 1
    };

    this.#http.post("api/baskets",basket).subscribe({
        next: (res) =>{
          this.#toast.showToast("Başarılı","Ürün sepete başarıyla eklendi.","success");
          this.#common.basketCount.update(prev => prev + 1);
        },
        error: (err) => this.#error.handle(err)
      });

  }

}
