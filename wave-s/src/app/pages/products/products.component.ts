import { Component, Renderer2, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  title = "wave-s";
  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;

  constructor(private renderer: Renderer2, private router: Router) { }

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

  showDialog: HTMLElement | null = document.getElementById("show__dialog");
  fullName: HTMLInputElement | null = document.getElementById("fname") as HTMLInputElement | null;
  telNum: HTMLInputElement | null = document.getElementById("tel") as HTMLInputElement | null;
  comment: HTMLInputElement | null = document.getElementById("comment") as HTMLInputElement | null;

  exitDialog() {
    if (this.showDialog) {
      this.showDialog.style.zIndex = "-1";
      this.showDialog.style.opacity = "0";
    }
  }

  openDialog() {
    if (this.showDialog) {
      this.showDialog.style.zIndex = "1";
      this.showDialog.style.opacity = "1";
    }

    if (this.fullName && this.telNum && this.comment) {
      let commentObject = {
        FullName: this.fullName.value,
        TelNum: this.telNum.value,
        Comment: this.comment.value,
      };
      console.log("Comment object:", commentObject);

      this.fullName.value = "";
      this.telNum.value = "";
      this.comment.value = "";
    }
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
