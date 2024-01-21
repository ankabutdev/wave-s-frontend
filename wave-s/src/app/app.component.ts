import { Component } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, TabMenuModule, BadgeModule,
    HomeComponent, ProductcomComponent, ProductsComponent, NotfoundComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
