import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BasketModel } from '@shared/models/basket.model';
import { Common } from '../../services/common';
import { TrCurrencyPipe } from 'tr-currency';
import { RouterLink } from '@angular/router';
import { Error } from '@shared/services/error';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [TrCurrencyPipe, RouterLink],
  templateUrl: './baskets.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Baskets {
  readonly result = httpResource<BasketModel[]>(() => {
    const endpoint = `api/baskets?userId=${this.#common.user()!.id}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly total = computed (() => {
    let val = 0;
    this.data().forEach(res => {
      val += res.productPrice * res.quantity
    });
    return val;
  });
  readonly kdv = computed(() => this.total() * 18/100);

  readonly #common = inject(Common);
  readonly #http = inject(HttpClient);
  readonly #error = inject(Error);
  readonly #toast = inject(FlexiToastService);

  increment(val: BasketModel){
    val.quantity++;
    this.#http.put(`api/baskets/${val.id}`,val).subscribe({
        next: (res) =>{
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)
      });
  }
  decrement(val: BasketModel){
    const count =  val.quantity - 1;
    if(count <= 0){
      this.#toast.showSwal("Ürünü Sil?","Ürünü sepetten silmek istiyor musnuz?","Sİl",() => {
        this.#http.delete(`api/baskets/${val.id}`).subscribe({
        next: (res) =>{
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)
      });
      })
      
    }else{
      val.quantity--;
      this.#http.put(`api/baskets/${val.id}`,val).subscribe({
        next: (res) =>{
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)
      });
    }  
  }


}
