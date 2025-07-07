import { Pipe, PipeTransform } from '@angular/core';
import { NavigationModel } from '../navigation';

@Pipe({
  name: 'nav'
})
export class NavPipe implements PipeTransform {

  transform(value: NavigationModel[], search: string): NavigationModel[] {
    if (!search) return value;

    return value.filter(nav => nav.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
