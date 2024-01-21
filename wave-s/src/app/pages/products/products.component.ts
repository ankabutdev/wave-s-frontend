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
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';

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

  applyForm: FormGroup;
  // applyForm = new FormGroup({
  //   fullName: new FormControl('', Validators.required),
  //   phoneNumber: new FormControl('', [Validators.required, this.phoneNumberValidator]),
  //   description: new FormControl('', Validators.required),
  // });

  constructor(private renderer: Renderer2, private router: Router,
    private productService: ProductService, private fb: FormBuilder,
    private userService: UserService) {
    this.applyForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      description: ['', Validators.required],
    });
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
        console.log('Invalid phone number format');
        return;
      } else {
        await this.proccess();
      }
    }
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
