import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { ShoppingcartComponent } from './shopping/shoppingcart/shoppingcart.component';
import { AuthGuard } from './service/auth.guard'; // make sure AuthGuard exists
import { CheckoutitemComponent } from './checkoutitem/checkoutitem.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'shopping',
    component: ShoppingcartComponent
  },
  {
    path: 'checkout',
    component: CheckoutitemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }