import { Component, Renderer2, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, BadgeModule, CommonModule,
    MatDialogModule, MatButtonModule, DialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  loaderOpacity = 1;
  loaderVisibility = 'visible';

  private loaderTimeout: any;

  constructor(private renderer: Renderer2, private router: Router,
    private dialog: MatDialog) { }

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

  visible: boolean = false;

  // Method to open the dialog
  showDialog() {
    this.visible = true;
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
}
