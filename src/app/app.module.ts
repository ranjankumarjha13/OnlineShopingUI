import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingcartComponent } from './shopping/shoppingcart/shoppingcart.component';
import { FormsModule } from '@angular/forms';
import { CheckoutitemComponent } from './checkoutitem/checkoutitem.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ShoppingcartComponent,
    CheckoutitemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
