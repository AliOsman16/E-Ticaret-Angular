import { Injectable, signal } from '@angular/core';
import { BreadcrumbModel } from '../pages/layouts/breadcrumb';
import UserCreate from '../pages/users/create/user-create';
import { UserModel } from '../pages/users/users';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly data = signal<BreadcrumbModel[]> ([]);
  readonly user = signal<UserModel | undefined>(undefined);

  set(data: BreadcrumbModel[]){
    const val: BreadcrumbModel = {
      title: "Ana Sayfa",
      url: "/",
      icon: "home"
    }
    this.data.set([val, ...data]);
  }

  constructor() { }
}
