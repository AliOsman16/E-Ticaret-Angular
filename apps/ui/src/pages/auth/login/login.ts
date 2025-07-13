import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '@shared/models/user.model';
import { Error } from '@shared/services/error';
import { Common } from 'apps/ui/src/services/common';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [RouterLink, FormsModule], 
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {


  readonly #http = inject(HttpClient);
  readonly #error = inject(Error);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);
  readonly #common = inject(Common);

  signIn(form:NgForm){
    if(!form.valid) return;

    this.#http.get<UserModel[]>(`api/users?userName=${form.value['userName']}&password=${form.value['password']}`).subscribe({
        next: (res) =>{
          if(res.length === 0){
            this.#toast.showToast("Hata","Kullanıcı adı ya da şifre yanlış!","error");
            return;
          }
          const user = res[0];
          localStorage.setItem("response",JSON.stringify(user));
          this.#common.user.set(user);
          this.#common.getBasketCount();
          this.#router.navigateByUrl("/")
        },
        error: (err) => this.#error.handle(err)
      });
  }

}
