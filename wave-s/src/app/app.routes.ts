import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './components/productdetails/product-details/product-details.component';
import { SliderComponent } from './components/slider/slider.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutCompanyComponent } from './components/about-company/about-company.component';
import { ObjectsComponent } from './components/objects/objects.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CommonPageComponent } from './pages/common-page/common-page.component';

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
    { path: 'common-page', component: CommonPageComponent, title: 'common-page' },
    { path: '**', component: NotfoundComponent }
];

export default routes;