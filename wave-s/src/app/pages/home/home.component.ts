import { Component, Renderer2, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit, OnDestroy {
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

  toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body!.className;
    body!.className = currentClass == "light-mode" ? "dark-mode" : "light-mode";
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
      console.log(commentObject);

      this.fullName.value = "";
      this.telNum.value = "";
      this.comment.value = "";
    }
  }

  redirectProducts() {
    this.router.navigate(['/products']);
  }
}
