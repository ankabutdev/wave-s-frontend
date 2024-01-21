import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/products';
import { CommonModule } from '@angular/common';
import { ImageUrlPipe } from '../../../pipes/image-url-pipe';

@Component({
  selector: 'app-productcom',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './productcom.component.html',
  styleUrl: './productcom.component.css'
})
export class ProductcomComponent {
  @Input()
  data!: Product;

  constructor() {
    console.log(this.data);
  }
}
