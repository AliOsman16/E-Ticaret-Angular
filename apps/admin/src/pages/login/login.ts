import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Error } from '../../../../../library/shared/src/services/error';
import { FlexiToastService } from 'flexi-toast';
import { UserModel } from '@shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {
  readonly #http =inject(HttpClient);
  readonly #error = inject(Error);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);

  signIn(form: NgForm){
    if(!form.valid) return;

    this.#http.get<UserModel[]>(`api/users?userName=${form.value['userName']}&password=${form.value['password']}`).subscribe({
        next: (res) =>{
          if(res.length === 0){
            this.#toast.showToast("Hata","Kullanıcı adı ya da şifre yanlış!","error");
            return;
          }else if(!res[0].isAdmin){
            this.#toast.showToast("Hata","Giriş yapmak için yetkiniz yok!","error");
            return;
          }
          localStorage.setItem("response",JSON.stringify(res[0]));
          this.#router.navigateByUrl("/")
        },
        error: (err) => this.#error.handle(err)
      });
  }

}
