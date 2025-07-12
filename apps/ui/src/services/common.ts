import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BasketModel } from '@shared/models/basket.model';
import { UserModel } from '@shared/models/user.model';
import { Error } from '@shared/services/error';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly user = signal<UserModel | undefined>(undefined);
  readonly basketCount = signal<number>(0);

  readonly #http = inject(HttpClient);
  readonly #error = inject(Error);

  constructor (){
    this.getBasketCount();
    const response: string | null = localStorage.getItem("response");
    if(response){
      this.user.set(JSON.parse(response));
    }
  }

  getBasketCount(){
    this.#http.get<BasketModel[]>("api/baskets").subscribe({
      next:(res) =>{
        this.basketCount.set(res.length);
      },
      error: (err) => this.#error.handle(err)
    })
  }
}
