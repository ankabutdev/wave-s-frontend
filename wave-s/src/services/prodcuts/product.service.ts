import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../interfaces/products";
import { Observable, catchError, timeout } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  url = 'http://localhost:5285/products';
  url2 = 'http://localhost:5285/users';
  urlServer = "http://185.217.131.163:5120/api/products";

  async getAllProducts() {
    return await this.http.get<Product[]>(this.urlServer)
      .pipe(
        timeout(600000), // Set timeout to 10 seconds (adjust as needed)
        catchError((error: any) => {
          console.error('Error fetching products:', error);
          throw error;
        })
      );
  }

  async getById(id: number) {
    return await this.http.get<Product>(this.url + "/" + id);
  }

}