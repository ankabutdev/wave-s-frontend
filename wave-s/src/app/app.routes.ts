import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './components/productdetails/product-details/product-details.component';
import { SliderComponent } from './components/slider/slider.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AboutCompanyComponent } from './pages/about-company/about-company.component';
import { ObjectsComponent } from './pages/objects/objects.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'details/:id', component: ProductDetailsComponent, title: 'Product details' },
    { path: 'slider', component: SliderComponent, title: 'slider' },
    { path: 'paginator', component: PaginatorComponent, title: 'paginator' },
    { path: 'contacts', component: ContactComponent, title: 'contacts' },
    { path: 'about-company', component: AboutCompanyComponent, title: 'about-company' },
    { path: 'objects', component: ObjectsComponent, title: 'objects' },
    { path: 'about-us', component: AboutUsComponent, title: 'about-us' },
    { path: '**', component: NotfoundComponent }
];

export default routes;