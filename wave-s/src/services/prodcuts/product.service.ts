import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../interfaces/products";
import { Observable, catchError } from "rxjs";
import { CreateUser } from "../users/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   *
   */
  constructor(private http: HttpClient) {

  }

  url = 'http://localhost:5120/api/products';
  url2 = 'http://localhost:5285/products';

  async getAllProducts() {
    return await this.http.get<Product[]>(this.url)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching products:', error);
          throw error;
        })
      );
  }

  async getById(id: number) {
    return await this.http.get<Product>(this.url + "/" + id);
  }

  // async submitApplication(firstName: string, lastName: string, email: string) {
  //   // await console.log(firstName, lastName, email);
  // }

  async createUser(data: CreateUser): Promise<Observable<any>> {
    return await this.http.post(this.url2, data);
  }
}