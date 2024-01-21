import { Component, Renderer2, AfterViewInit, OnDestroy, OnInit, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from '../../../services/prodcuts/product.service';
import { ProductcomComponent } from '../../components/products/productcom/productcom.component';
import { Product } from '../../../interfaces/products';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule,
    DialogModule, ProductcomComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;

  productList: Product[] = [];

  constructor(private renderer: Renderer2, private router: Router,
    private productService: ProductService) {
  }

  async ngOnInit() {
    await this.GetAllProducts();
  }

  private async GetAllProducts() {
    (await this.productService.getAllProducts()).subscribe(response => {
      this.productList = response;
      console.log('get successful', this.productList);
    });
  }

  ngAfterViewInit() {
    this.loaderTimeout = setTimeout(() => {
      this.renderer.setStyle(this.loader, 'opacity', '0');
      this.renderer.setStyle(this.loader, 'visibility', 'hidden');
    }, 200);
  }

  ngOnDestroy() {
    clearTimeout(this.loaderTimeout);
  }

  private get loader(): HTMLElement | null {
    return document.querySelector('.loader');
  }

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  visible: boolean = false;

  // Method to open the dialog
  async showDialog() {
    //this.productService.
    (await this.productService.createUser(this.applyForm.getRawValue()))
      .subscribe((response: any) => {
        console.log('Post successful', response);
      });
    this.visible = true;
  }

  // Method to close the dialog
  closeDialog() {
    this.visible = false;
    this.router.navigate(['/products']);
  }

  toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body!.className;
    body!.className = currentClass == "light-mode" ? "dark-mode" : "light-mode";
  }

  redirectProducts() {
    this.router.navigate(['/products']);
  }

  redirectToHomePage() {
    this.router.navigate(['/home']);
  }
}
