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
    return await this.http.get<Product[]>(this.urlServer + "/categories/name/" + categoryName);
  }

  // --------------------------

  getProductsDemoData() {
    return [
      {
        id: 1,
        categoryId: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description of Product 1',
        companyId: 1,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Metal',
        mounted: 'Wall',
        screen: 'LCD',
        buttons: 'Touch',
        weight: 5,
        backlight: 'LED',
        type: 'Digital',
        foam: 'Yes',
        mum: 'Yes',
        smartpause: 'Yes',
        turbopressure: 'No',
        imagePath: 'path/to/image1.jpg',
      },
      {
        id: 2,
        categoryId: 2,
        name: 'Product 2',
        price: 150,
        description: 'Description of Product 2',
        companyId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Plastic',
        mounted: 'Tabletop',
        screen: 'LED',
        buttons: 'Physical',
        weight: 3,
        backlight: 'None',
        type: 'Analog',
        foam: 'No',
        mum: 'No',
        smartpause: 'No',
        turbopressure: 'Yes',
        imagePath: 'path/to/image2.jpg',
      },
      {
        id: 3,
        categoryId: 1,
        name: 'Product 3',
        price: 120,
        description: 'Description of Product 3',
        companyId: 1,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Plastic',
        mounted: 'Tabletop',
        screen: 'LCD',
        buttons: 'Physical',
        weight: 4,
        backlight: 'LED',
        type: 'Digital',
        foam: 'Yes',
        mum: 'Yes',
        smartpause: 'No',
        turbopressure: 'No',
        imagePath: 'path/to/image3.jpg',
      },
      {
        id: 4,
        categoryId: 2,
        name: 'Product 4',
        price: 200,
        description: 'Description of Product 4',
        companyId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Metal',
        mounted: 'Wall',
        screen: 'LED',
        buttons: 'Touch',
        weight: 6,
        backlight: 'LED',
        type: 'Digital',
        foam: 'No',
        mum: 'Yes',
        smartpause: 'Yes',
        turbopressure: 'Yes',
        imagePath: 'path/to/image4.jpg',
      },
      {
        id: 5,
        categoryId: 1,
        name: 'Product 5',
        price: 180,
        description: 'Description of Product 5',
        companyId: 1,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Metal',
        mounted: 'Wall',
        screen: 'LED',
        buttons: 'Touch',
        weight: 7,
        backlight: 'None',
        type: 'Analog',
        foam: 'Yes',
        mum: 'No',
        smartpause: 'Yes',
        turbopressure: 'No',
        imagePath: 'path/to/image5.jpg',
      },
      {
        id: 6,
        categoryId: 2,
        name: 'Product 6',
        price: 250,
        description: 'Description of Product 6',
        companyId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Plastic',
        mounted: 'Tabletop',
        screen: 'LCD',
        buttons: 'Physical',
        weight: 3,
        backlight: 'LED',
        type: 'Digital',
        foam: 'No',
        mum: 'Yes',
        smartpause: 'No',
        turbopressure: 'Yes',
        imagePath: 'path/to/image6.jpg',
      },
      {
        id: 7,
        categoryId: 1,
        name: 'Product 7',
        price: 160,
        description: 'Description of Product 7',
        companyId: 1,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Plastic',
        mounted: 'Tabletop',
        screen: 'LCD',
        buttons: 'Physical',
        weight: 4,
        backlight: 'None',
        type: 'Analog',
        foam: 'No',
        mum: 'Yes',
        smartpause: 'Yes',
        turbopressure: 'No',
        imagePath: 'path/to/image7.jpg',
      },
      {
        id: 8,
        categoryId: 2,
        name: 'Product 8',
        price: 300,
        description: 'Description of Product 8',
        companyId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Metal',
        mounted: 'Wall',
        screen: 'LED',
        buttons: 'Touch',
        weight: 8,
        backlight: 'LED',
        type: 'Digital',
        foam: 'Yes',
        mum: 'No',
        smartpause: 'Yes',
        turbopressure: 'Yes',
        imagePath: 'path/to/image8.jpg',
      },
      {
        id: 9,
        categoryId: 1,
        name: 'Product 9',
        price: 140,
        description: 'Description of Product 9',
        companyId: 1,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Metal',
        mounted: 'Wall',
        screen: 'LCD',
        buttons: 'Touch',
        weight: 5,
        backlight: 'LED',
        type: 'Digital',
        foam: 'Yes',
        mum: 'Yes',
        smartpause: 'Yes',
        turbopressure: 'No',
        imagePath: 'path/to/image9.jpg',
      },
      {
        id: 10,
        categoryId: 2,
        name: 'Product 10',
        price: 220,
        description: 'Description of Product 10',
        companyId: 2,
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-03'),
        frame: 'Plastic',
        mounted: 'Tabletop',
        screen: 'LCD',
        buttons: 'Physical',
        weight: 4,
        backlight: 'None',
        type: 'Analog',
        foam: 'No',
        mum: 'No',
        smartpause: 'Yes',
        turbopressure: 'No',
        imagePath: 'path/to/image10.jpg',
      },
    ];
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsDemoData().slice(0, 5));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsDemoData().slice(0, 10));
  }

  getProducts() {
    return Promise.resolve(this.getProductsDemoData());
  }

  async getProductsTop() {
    // return [];
    return await this.http.get<Product[]>(this.urlServer + "/" + 12);
  }


}