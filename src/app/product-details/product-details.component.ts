import { Component, Input } from '@angular/core';
import jasondata from './data/products.json';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DiscountPricePipe } from "../discount-price.pipe";
import { CartService } from '../services/cart.service';
import { Product } from '../main-page/product.model'; // Ensure correct import path

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, DiscountPricePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  products: Product[] = jasondata as unknown as Product[];
  selectedImage: string | undefined;

  @Input() id: any = '';
  product: Product | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.product = this.products.find((pro) => pro.id === +this.id);
    console.log(this.product);
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  addToCart(): void {
    if (this.product) {
      console.log('Adding to cart:', this.product);
      this.cartService.addToCart({ ...this.product, quantity: 1 });
    }
  }
}
