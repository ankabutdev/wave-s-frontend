import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../interfaces/products";
import { Observable, catchError, retry, timeout } from "rxjs";
import { TIMEOUT } from "dns";

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
    return await this.http.get<Product[]>(this.urlGateWayServer)
      .pipe(
        //timeout(600000), // Set timeout to 10 seconds (adjust as needed)
        catchError((error: any) => {
          console.error('Error fetching products:', error);
          throw error;
        })
      );
  }

  async getById(id: number) {
    return await this.http.get<Product>(this.urlGateWayServer + "/" + id);
  }

}