import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from './product.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports:[NgClass, NgFor, NgIf, NgStyle],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('https://auto-gear.vercel.app/spare-parts')
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log('Fetched products:', this.products); 
        },
        error: (err) => {
          console.error('Error fetching products', err);
          console.log('Failed to fetch products'); 
        }
      });
  }

  handleData(id: string): void {
    this.router.navigate(['/product-details', id]);
  }

  isTitleLong(title: string): boolean {
    return title.split(' ').length > 3;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({ ...product, quantity: 1 });
  }
  
}
