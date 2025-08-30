import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/create-user-request.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
    private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }
  private loggedIn = false;



  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginRequest, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  createUser(userRequest: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userRequest, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
