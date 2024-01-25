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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule,
    DialogModule, ProductcomComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  // loaderOpacity = 1;
  // loaderVisibility = 'visible';

  // private loaderTimeout: any;

  productList: Product[] | undefined = [];

  applyForm!: FormGroup;
  // applyForm = new FormGroup({
  //   fullName: new FormControl('', Validators.required),
  //   phoneNumber: new FormControl('', [Validators.required, this.phoneNumberValidator]),
  //   description: new FormControl('', Validators.required),
  // });

  constructor(private renderer: Renderer2, private router: Router,
    private productService: ProductService, private fb: FormBuilder,
    private userService: UserService) {

    this.GetAllProducts();
    this.applyForms();
  }

  private applyForms() {
    this.applyForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      description: ['', Validators.required],
    });
  }

  private GetAllProducts() {
    this.productService.getAllProducts().subscribe(
      response => {
        this.productList = response;
        console.log('get successful', this.productList);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );

    // try {
    //   // Set the timeout limit to 600 milliseconds
    //   const timeoutLimit = 600000;

    //   // Use the timer function to create an observable that emits after the specified time
    //   const timeoutObservable = timer(timeoutLimit);

    //   // Use the switchMap operator to switch to the timeout observable if the original observable takes too long
    //   const combinedObservable = (await this.productService.getAllProducts()).pipe(
    //     timeout(timeoutLimit),
    //   );

    //   // Subscribe to the combined observable
    //   const response = await combinedObservable.toPromise();

    //   // Handle the response as needed
    //   if (Array.isArray(response)) {
    //     this.productList = response;
    //     console.log('Get successful', this.productList);
    //   } else {
    //     console.error('Invalid response format:', response);
    //   }
    // } catch (error) {
    //   // Handle the timeout error or other errors
    //   console.error('Timeout or error getting products:', error);
    // }
  }

  // ngAfterViewInit() {
  // try {
  //   await this.GetAllProducts();
  // } catch (error) {
  //   console.error('Error getting products:', error);
  // }
  // this.loaderTimeout = setTimeout(() => {
  //   this.renderer.setStyle(this.loader, 'opacity', '0');
  //   this.renderer.setStyle(this.loader, 'visibility', 'hidden');
  // }, 500);

  // }

  // ngOnDestroy() {
  //   clearTimeout(this.loaderTimeout);
  // }

  // private get loader(): HTMLElement | null {
  //   return document.querySelector('.loader');
  // }

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
