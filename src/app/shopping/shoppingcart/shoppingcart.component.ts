import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-tem';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent {

  cart: CartItem[] = [];
  showCart: boolean = false;
  constructor(private router: Router,private cartService: CartServiceService){}

  addToCart(name: string, price: number, img: string): void {
    const item = this.cart.find(i => i.name === name);
    if (item) {
      item.qty++;
    } else {
      this.cart.push({ name, price, qty: 1, img });
    }
  }

  changeQty(index: number, delta: number): void {
    this.cart[index].qty += delta;
    if (this.cart[index].qty <= 0) {
      this.cart.splice(index, 1);
    }
  }
  checkoutItem() {
  if (!this.cart || this.cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Optionally save cart to localStorage or a service to pass to checkout
  localStorage.setItem('cart', JSON.stringify(this.cart));
  this.cartService.setCart(this.cart); // save cart to service
  this.router.navigate(['/checkout']);
  console.log('Cart:', JSON.stringify(this.cart));
}

  getTotalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
  logout() {
this.router.navigate(['/login']); // redirect to login page
  }
}