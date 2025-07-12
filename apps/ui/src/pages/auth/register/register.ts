import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormsModule, NgForm} from  '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { initialUser, UserModel } from '@shared/models/user.model';
import { Error } from '@shared/services/error';

@Component({
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Register {

  readonly data = signal<UserModel>(initialUser);

  readonly #http = inject(HttpClient);
  readonly #error = inject(Error);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);

  signUp(form:NgForm){
    if(!form.valid) return;

    this.data.update(prev => ({
      ...prev,
      fullName:  `${prev.firstName} ${prev.lastName}`
    }))
    this.#http.post("api/users",this.data()).subscribe({
        next: (res) =>{
          this.#toast.showToast("Başarılı","Kaydınız başarıyla tamamlandı. Giriş yapabilirsiniz.","success");
          this.#router.navigateByUrl("/auth/login");
        },
        error: (err) => this.#error.handle(err)
      });
  }

}
