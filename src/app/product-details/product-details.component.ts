import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DiscountPricePipe } from "../discount-price.pipe";
import { CartService } from '../services/cart.service';
import { Product } from '../main-page/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, DiscountPricePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() id: string = ''; // Define as string for consistency
  product: Product | undefined;
  selectedImage: string | undefined;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProductDetails();
  }

  fetchProductDetails(): void {
    // Fetch product details from the API based on the provided id
    this.http.get<Product>(`https://auto-gear.vercel.app/spare-parts/${this.id}`)
      .subscribe({
        next: (data) => {
          this.product = data;
          console.log('Fetched product:', this.product);
        },
        error: (err) => console.error('Error fetching product details', err)
      });
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  addToCart(): void {
    if (this.product) {
      console.log('Adding to cart:', this.product);
      this.cartService.addToCart({ ...this.product, quantity: 1 });
    }
  }
}