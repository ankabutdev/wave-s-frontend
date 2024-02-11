import { Component, Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from '../../../services/prodcuts/product.service';
import { ProductcomComponent } from '../../components/products/productcom/productcom.component';
import { Product } from '../../../interfaces/products';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule,
    DialogModule, ProductcomComponent, FormsModule, ReactiveFormsModule, SliderComponent,
    PaginatorModule, PaginatorComponent, MatPaginatorModule]
})

export class ProductsComponent {

  // pageNo!: number;

  // async pageChanged(event: any) {
  //   if (event.pageIndex > this.pageNo) {
  //     this.currentPage += 1;
  //     // Clicked on next button
  //     await this.GetAllProducts(this.currentPage);
  //   } else {
  //     // Clicked on previous button
  //     this.currentPage -= 1;
  //     await this.GetAllProducts(this.currentPage);
  //   }
  // }

  // pageSize: number = 9; // Page size for pagination
  // currentPage: number = 1; // Current page

  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;

  productList: Product[] | undefined = [];
  selectedCategory!: string | null;

  applyForm!: FormGroup;

  totalRecords!: number;
  first: number = 0;
  rows: number = 9;
  val!: number;

  async onPageChange(event: { first: number, rows: number }) {
    this.first = event.first + 1;
    this.rows = event.rows;
    await this.GetAllProducts();
  }

  constructor(private renderer: Renderer2, private router: Router,
    private productService: ProductService, private fb: FormBuilder,
    private userService: UserService) {
    // this.pageNo = 0;
    this.applyForms();
  }

  private async applyForms() {
    this.applyForm = await this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      description: ['', Validators.required],
    });
  }

  private async GetAllProducts() {
    await this.productsCount();
    (await this.productService.getAllProducts(this.first)).subscribe(
      response => {
        this.productList = response;
        console.log('getall successfully');
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  async productsCount() {
    (await this.productService.getCount()).subscribe(response => {
      // fix it this code not ready
      this.totalRecords = response;
    },
      error => {
        console.error('Error fetching products:', error);
      })

  }

  async ngAfterViewInit() {
    try {
      await this.GetAllProducts();
      this.selectedCategory = 'Все оборудование';
    } catch (error) {
      console.error('Error getting products:', error);
    }
    this.loaderTimeout = setTimeout(() => {
      this.renderer.setStyle(this.loader, 'opacity', '0');
      this.renderer.setStyle(this.loader, 'visibility', 'hidden');
    }, 500);

  }

  ngOnDestroy() {
    clearTimeout(this.loaderTimeout);
  }

  private get loader(): HTMLElement | null {
    return document.querySelector('.loader');
  }

  visible: boolean = false;

  // Method to open the dialog
  async proccess() {
    (await this.userService.createUser(this.applyForm.getRawValue()))
      .subscribe((response: any) => {
        console.log('Post successful', response);
      });

    this.visible = true;
  }

  // Custom validator for phone number format
  phoneNumberValidator(control: AbstractControl<any, any>) {
    const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Adjust the pattern based on your requirements
    const isValid = phoneNumberPattern.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };
  }

  async showDialog() {
    // Check if the phone number format is valid before proceeding
    const phoneNumberControl = this.applyForm.get('phoneNumber');
    if (phoneNumberControl && phoneNumberControl.value) {
      const isValidFormat = this.phoneNumberValidator(phoneNumberControl);
      if (isValidFormat !== null) {
        alert("Invalid phone number format!")
        console.log('Invalid phone number format');
        return;
      } else {
        await this.proccess();
        await this.applyForms();
      }
    } else
      alert("Please to fill fields");
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

  async getProductsByCategory(category: string | null) {
    if (category !== null) {
      this.selectedCategory = category;
      (await this.productService.getProductsByCategory(category)).subscribe(
        response => {
          this.productList = response;
          console.log('Successfully', category);
        },
        error => {
          console.error('Error', error);
        }
      );
    } else {

      this.selectedCategory = 'Все оборудование';
      this.GetAllProducts();
    }
  }
}
