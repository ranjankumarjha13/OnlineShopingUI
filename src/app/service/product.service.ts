import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[] | string> {
    return this.http.get<Product[] | string>(this.baseUrl+'/fetchproduct');
  }
}
