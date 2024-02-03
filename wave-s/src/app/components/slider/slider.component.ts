import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../../services/prodcuts/product.service';
import { Product } from '../../../interfaces/products';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, TagModule, ButtonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {

  products!: Product[];

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

}
