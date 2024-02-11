import { Component, Renderer2, AfterViewInit, OnDestroy, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { PageName } from '../../../interfaces/pages-router-name';
import { RouterService } from '../../../services/RouterService';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule,
    MatDialogModule, MatButtonModule, DialogModule, FormsModule, ReactiveFormsModule,
    SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  async newMessage() {
    this.router.navigate(['/common-page'])
    await this.routerService.changeMessage('contacts')
  }

  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;

  applyForm!: FormGroup;

  constructor(private renderer: Renderer2, private router: Router,
    private dialog: MatDialog, private fb: FormBuilder,
    private userService: UserService, private routerService: RouterService) {
    this.applyForms();
  }

  private async applyForms() {
    this.applyForm = await this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      description: ['', Validators.required],
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
        alert("Invalid phone number format!")
        console.log('Invalid phone number format');
        return;
      } else {
        await this.proccess();
        await this.applyForms();
        alert("hi")
      }
    } else
      alert("Please to fill fields");
  }
  // Method to close the dialog
  closeDialog() {
    this.visible = false;
    this.router.navigate(['/home']);
  }

  toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body!.className;
    body!.className = currentClass == "light-mode" ? "dark-mode" : "light-mode";
  }
  redirectProducts() {
    this.router.navigate(['/products']);
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
