import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from './product.model';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports:[NgClass, NgFor, NgIf, NgStyle],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: { title: string, image: string }[] = [
    { title: 'oil filters', image: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/oil-filter-3402967-2836815.png?f=webp&w=256' },
    { title: 'car battries', image: 'https://cdn-icons-png.flaticon.com/128/2087/2087628.png' },
    { title: 'Wiper Blades', image: 'https://cdn-icons-png.flaticon.com/128/3374/3374671.png' },
    { title: 'Spark Plugs', image: 'https://cdn-icons-png.flaticon.com/128/10690/10690314.png' }
  ];

  constructor(private http: HttpClient, private router: Router, private cartService: CartService,    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('https://auto-gear.vercel.app/spare-parts/all')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.filteredProducts = this.products;
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

  toggleFavorite(product: Product): void {
    if (product._id) {
      if (this.favoritesService.isFavorite(product._id)) {
        this.favoritesService.removeFavorite(product._id);
        console.log('Removed from favorites:', product._id);
      } else {
        this.favoritesService.addFavorite(product._id);
        console.log('Added to favorites:', product._id);
      }
    }
  }

  isFavorite(product: Product): boolean {
    const favorites = this.favoritesService.getFavorites();
    return favorites.includes(product._id);
  }

  onCategoryChange(category: string): void {
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category ==category);
    }
  }
}
