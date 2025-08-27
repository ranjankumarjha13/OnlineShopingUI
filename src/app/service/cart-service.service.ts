import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-tem';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cart: CartItem[] = [];

  setCart(items: CartItem[]) {
    this.cart = items;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
