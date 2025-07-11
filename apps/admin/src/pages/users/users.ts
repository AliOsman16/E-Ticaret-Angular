import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FormsModule } from '@angular/forms';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { Error } from '../../../../../library/shared/src/services/error';
import { UserModel } from '@shared/models/user.model'



@Component({
  imports: [Blank, FormsModule, FlexiGridModule, RouterLink],
  templateUrl: './users.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Users {
  readonly result = httpResource<UserModel[]>(()=> "api/users");
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #error = inject(Error);

  delete(id:string){
    this.#toast.showSwal("Kullanıcıyı Sil","Kullanıcıyı silmek istiyor musunuz?","Sil",() =>{
      this.#http.delete(`api/users/${id}`).subscribe({
        next: () => {
          this.#toast.showToast("Başarılı", "Kullanıcı başarıyla silindi!", "success");
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)
      });
    })
  }

  changeIsAdmin(data: UserModel){
    this.#toast.showSwal("Yetki Değiştir",`${data.fullName} isimli kullanıcının yetkisini değiştirmek istiyor musunuz?`,"Değiştir",() =>{
      this.#http.put(`api/users/${data.id}`,data).subscribe({
        next: () => {
          this.#toast.showToast("Dikkat", "Kullanıcının yetkisi değiştirildi!", "warning");
          this.result.reload();
        },
        error: (err) => this.#error.handle(err)
      });
    });
    console.log(data);
  }

}
