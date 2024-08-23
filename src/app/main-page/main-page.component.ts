import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import jasondata from './data/products.json';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Product } from './product.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, NgStyle],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  products: Product[] = jasondata as unknown as Product[];

  constructor(private router: Router, private cartService: CartService) {}

  handleData(id: number) {
    this.router.navigate(['/product-details', id]);
  }

  isTitleLong(title: string): boolean {
    return title.split(' ').length > 3;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({ ...product, quantity: 1 });
  }
}
