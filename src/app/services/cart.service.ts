import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../main-page/product.model'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private totalItemsSubject = new BehaviorSubject<number>(0);

  totalItems$ = this.totalItemsSubject.asObservable();

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(item: Product): void {
    this.cartItems.push(item);
    this.updateTotalItems();
  }

  updateCart(item: Product): void {
    const index = this.cartItems.findIndex(cartItem => cartItem._id === item._id);
    if (index !== -1) {
      this.cartItems[index] = item;
      this.updateTotalItems();
    }
  }

  removeFromCart(item: Product): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem._id !== item._id);
    this.updateTotalItems();
  }

  private updateTotalItems(): void {
    const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItemsSubject.next(totalItems);
  }
}