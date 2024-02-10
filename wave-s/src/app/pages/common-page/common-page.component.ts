import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../../services/users/user.service';
import { PageName } from '../../../interfaces/pages-router-name';
import { RouterService } from '../../../services/RouterService';
import { ContactComponent } from '../../components/contact/contact.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { AboutCompanyComponent } from '../../components/about-company/about-company.component';
import { Title } from '@angular/platform-browser';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-common-page',
  standalone: true,
  imports: [CommonModule, RouterLink,
    ReactiveFormsModule, DialogModule, ContactComponent,
    AboutCompanyComponent, AboutUsComponent],
  templateUrl: './common-page.component.html',
  styleUrl: './common-page.component.css'
})

export class CommonPageComponent implements OnInit {

  message!: string;

  ngOnInit() {
    this.routerService.currentMessage.subscribe(message =>
      this.message = message)

    this.titleService.setTitle("contacts");
    this.route.snapshot.title
  }

  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;
  applyForm!: FormGroup;

  pageName!: PageName;

  constructor(private fb: FormBuilder, private renderer: Renderer2,
    private router: Router, private userService: UserService,
    private route: ActivatedRoute, private routerService: RouterService,
    private titleService: Title) {
    // console.log(route.snapshot.title);
    this.applyForms();
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
    this.router.navigate(['/']);
  }

}
