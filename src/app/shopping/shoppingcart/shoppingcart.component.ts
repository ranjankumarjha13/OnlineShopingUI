import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-tem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart-service.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  cart: CartItem[] = [];
  products: Product[] = [];
  loggedInuser: any;
  showCart: boolean = false;
  constructor(private router: Router, private cartService: CartService,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.fetchProducts()
    this.loggedInuser = this.cartService.getUser();
    let name = this.loggedInuser.split('@')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    this.loggedInuser = name;
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.products = res;
        } else {
          // this.errorMessage = res; // In case backend returns Constants.PRODUCT_NOT_FOUND
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        // this.errorMessage = 'Failed to load products';
      }
    });
  }


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
    this.router.navigate(['/welcome']); // redirect to welcome page
  }
}