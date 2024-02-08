import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../../services/prodcuts/product.service';
import { Product } from '../../../interfaces/products';
import { ImageUrlPipe } from '../../pipes/image-url-pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, TagModule, ButtonModule, ImageUrlPipe, RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})

export class SliderComponent {
  data!: Product[];

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) { }

  async ngOnInit() {
    (await this.productService.getAllProducts(null)).subscribe(products => {
      this.data = products;
    });
    console.log(this.data);

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
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
