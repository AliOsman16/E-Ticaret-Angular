import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridModule } from 'flexi-grid';

export interface ProductModel{
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;  
}

@Component({
  imports: [Blank, FlexiGridModule],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
  readonly data = signal<ProductModel[]>([
    {
      name: "İphone 15 Pro",
      imageUrl: "https://m.media-amazon.com/images/G/41/Apple/Compchart/iPhone_15_Pro_Max._CB578161143_.png",
      price: 100000,
      stock: 15
    },
    {
      name: "İphone 15 Pro",
      imageUrl: "https://m.media-amazon.com/images/G/41/Apple/Compchart/iPhone_15_Pro_Max._CB578161143_.png",
      price: 100000,
      stock: 15
    }
  ]);
}
