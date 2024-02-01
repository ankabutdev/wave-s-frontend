import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { HomeComponent } from './pages/home/home.component';
import { ProductcomComponent } from './components/products/productcom/productcom.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DomSanitizer, Meta, SafeHtml } from '@angular/platform-browser';
import { productLD } from '../productLD';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, TabMenuModule, BadgeModule,
    HomeComponent, ProductcomComponent, ProductsComponent, NotfoundComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  itemLD = productLD;
  html!: SafeHtml;

  constructor(private meta: Meta, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);

    this.meta.addTags([
      { name: 'description', content: 'Default meta description for your Angular application' },
      // Add more default meta tags if needed
    ]);
  }
  getSafeHTML(jsonLD: { [key: string]: any }): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
