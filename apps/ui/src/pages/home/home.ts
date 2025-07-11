import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, signal, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@shared/models/product.model';
import { TrCurrencyPipe } from 'tr-currency'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  imports: [TrCurrencyPipe, InfiniteScrollDirective],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
  readonly limit = signal<number>(9);
  readonly start = signal<number>(0);
  readonly result = httpResource<ProductModel[]>(() => `api/products?_limit=${this.limit()}&_start=${this.start()}`);
  readonly data = computed(() => this.result.value() ?? []);
  readonly dataSignal = signal<ProductModel[]>([]);
  readonly loading = computed(() => this.result.error() ? false : this.result.isLoading());

  constructor(){
    effect(() => {
      this.dataSignal.update(prev => [...prev, ...this.data()])
    })
  }

  onScroll(){
    this.limit.update(prev => prev + 9);
    this.start.update(prev => prev + 9);
  }

}
