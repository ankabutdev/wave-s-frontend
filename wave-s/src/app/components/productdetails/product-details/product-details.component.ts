import { Component, Renderer2 } from '@angular/core';
import { Product } from '../../../../interfaces/products';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/prodcuts/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/users/user.service';
import { DialogModule } from 'primeng/dialog';
import { ImageUrlPipe } from '../../../pipes/image-url-pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DialogModule, ImageUrlPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;

  product!: Product;
  applyForm!: FormGroup;

  // applyForm = new FormGroup({
  //   name: new FormControl(''),
  //   categoryId: new FormControl(),
  //   price: new FormControl(),
  //   description: new FormControl(''),
  //   companyId: new FormControl(),
  //   createdAt: new FormControl(Date.now()),
  //   updatedAt: new FormControl(Date.now()),
  //   frame: new FormControl(''),
  //   mounted: new FormControl(''),
  //   screen: new FormControl(''),
  //   buttons: new FormControl(''),
  //   weight: new FormControl(),
  //   backlight: new FormControl(''),
  //   type: new FormControl(''),
  //   foam: new FormControl(''),
  //   mum: new FormControl(''),
  //   smartpause: new FormControl(''),
  //   turbopressure: new FormControl(''),
  //   imagePath: new FormControl(''),
  // })

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private fb: FormBuilder, private renderer: Renderer2,
    private userService: UserService) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.some(productId);
    this.applyForms();
  }

  async some(productId: number) {
    (await this.productService.getById(productId)).subscribe(response => {
      this.product = response;
    })
  }

  // Custom validator for phone number format
  phoneNumberValidator(control: AbstractControl<any, any>) {
    const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Adjust the pattern based on your requirements
    const isValid = phoneNumberPattern.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };
  }

  private applyForms() {
    this.applyForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      description: ['', Validators.required],
    });
  }

  async ngAfterViewInit() {
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
}