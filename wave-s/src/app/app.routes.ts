import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { DemoComponent } from './pages/demo/demo.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'demo', component: DemoComponent },
    { path: '**', component: NotfoundComponent }
];

export default routes;