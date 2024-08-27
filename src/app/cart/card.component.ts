import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../main-page/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cartItems: Product[] = [];
  totalItems = 0;
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.setRedirectUrl('/cart'); 
      this.router.navigate(['/login']);
    } else {
      this.getCartItems();
    }
  }

  getCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateCartSummary();
  }

  updateCart(item: Product): void {
    this.cartService.updateCart(item);
    this.calculateCartSummary();
  }

  removeFromCart(item: Product): void {
    this.cartService.removeFromCart(item);
    this.getCartItems();
  }

  calculateCartSummary(): void {
    this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  checkout(): void {
    if (this.authService.isLoggedIn()) {
      console.log('Proceeding to checkout...');
    } else {
      console.log('User not logged in. Redirecting to login page...');
      this.router.navigate(['/login']);
    }
  }
}
