import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-tem';

@Injectable({
  providedIn: 'root'
})
export class CartService
 {
  private cart: CartItem[] = [];
  private user:any;

  setCart(items: CartItem[]) {
    this.cart = items;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  setUser(user:any) {
    this.user = user;
  }

 getUser(): any {
  return this.user;
}

}
