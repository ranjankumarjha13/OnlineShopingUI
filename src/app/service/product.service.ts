import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
     private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[] | string> {
    return this.http.get<Product[] | string>(this.baseUrl+'/fetchproduct');
  }
}
