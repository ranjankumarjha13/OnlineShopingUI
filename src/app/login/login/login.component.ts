import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/create-user-request.model';
import { LoginRequest } from 'src/app/model/login-request.model';
import { AuthguardService } from 'src/app/service/authguard.service';
import { CartService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: any;
  password: any;
  titile = "Please Login"
  isLogin = true;


  errorMessage: string = '';

  constructor(private authService: AuthguardService, private router: Router,
    private cartservice: CartService
  ) { }

  onClickCreateAccount() {
    this.isLogin = false;
    this.errorMessage = "";
    this.username = "";
    this.password = "";
    this.titile = "Please Register to Enjoy Shopping!";
  }
  registerUser() {
    this.createUser();
  }

  validateUser() {
    // Front-end validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    const loginRequest: LoginRequest = {
      username: this.username,
      password: this.password
    };
    console.log('Login request:', loginRequest);

    this.authService.login(loginRequest).subscribe({
      next: (res) => {

        if (res && res.username === this.username) {
           localStorage.setItem('username', JSON.stringify(res.username));
          this.cartservice.setUser(res.username);
          this.router.navigate(['/shopping']);
        } else {
          this.errorMessage = res.message + ' Click Sign Up to Register';
        }
      },
      error: (err) => {
        console.error("HTTP error:", err);
        this.errorMessage = err.error?.message || 'Login failed! Click Signup to Register';
      }
    });
  }

  createUser() {
    // Front-end validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password
    };
    console.log('Register request:', user);

    this.authService.createUser(user).subscribe({
      next: (res) => {
        if (res.message == 'User registered successfully!') {
          this.errorMessage = "User registered successfully!";
          this.isLogin = true;
          setTimeout(() => { this.errorMessage = ""; }, 1500);
          this.titile = "Please Login";
          this.username = "";
          this.password = "";
        }
      },
      error: (err) => {
        console.error("HTTP error:", err);
        this.errorMessage = err.error?.message || 'Registration failed!';
      }
    });
  }
}