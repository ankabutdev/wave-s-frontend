import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../interfaces/products";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  url = 'http://localhost:5120/api/products';
  url2 = 'http://localhost:5285/users';
  urlServer = "http://185.217.131.163:5120/api/products";

  // Only GetAll And GetById
  urlGateWayServer = "http://185.217.131.163:5285/products"

  async getAllProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      })
    }

    return await this.http.get<Product[]>(this.urlGateWayServer, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching products:', error);
          throw error;
        })
      );
  }

  async getById(id: number) {
    return await this.http.get<Product>(this.urlGateWayServer + "/" + id);
  }

  async getProductsByCategory(categoryName: string) {
    return await this.http.get<Product[]>(this.urlGateWayServer + "/products/categories/" + categoryName);
  }

}