import { Component, Renderer2 } from '@angular/core';
import { Product } from '../../../../interfaces/products';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/prodcuts/product.service';
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

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private fb: FormBuilder, private renderer: Renderer2,
    private userService: UserService) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.getProductIdFromUrl(productId);
    this.applyForms();
  }

  private async getProductIdFromUrl(productId: number) {
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
        alert("Invalid phone number format!")
        console.log('Invalid phone number format');
        return;
      } else {
        await this.proccess();
        await this.applyForms();
      }
    }
  }

  // Method to close the dialog
  closeDialog() {
    this.visible = false;
    this.router.navigate(['/products']);
  }

  redirectConsultation() {
    let url = `/details/${this.product.id}`;
    this.router.navigate([url]);
  }
}
