import { Injectable } from '@angular/core';
import { Product } from '../main-page/product.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(item: Product): void {
    this.cartItems.push(item);
  }

  updateCart(item: Product): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index] = item;
    }
  }

  removeFromCart(item: Product): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  }
}