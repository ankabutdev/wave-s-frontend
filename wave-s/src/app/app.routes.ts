import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './components/productdetails/product-details/product-details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'details/:id', component: ProductDetailsComponent, title: 'Product details' },
    { path: '**', component: NotfoundComponent }
];

export default routes;