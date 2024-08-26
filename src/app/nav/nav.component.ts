          import { Component, EventEmitter, Output } from '@angular/core';
          import { RouterLink, RouterLinkActive } from '@angular/router';
          import { CartService } from '../services/cart.service'; 
          import { NgClass } from '@angular/common';

          @Component({
            selector: 'app-nav',
            standalone: true,
            imports: [RouterLink,RouterLinkActive,NgClass],
            templateUrl: './nav.component.html',
            styleUrl: './nav.component.css'
          })
          export class NavComponent {
            @Output() openLogin = new EventEmitter<void>();
            @Output() openRegistration = new EventEmitter<void>();
          
            openLoginModal() {
              this.openLogin.emit();
            }
          
            openRegistrationModal() {
              this.openRegistration.emit();
            }
            totalItems = 0;

            constructor(private cartService: CartService) {}
          
            ngOnInit(): void {
              this.cartService.totalItems$.subscribe(total => {
                this.totalItems = total;
              });
            }
          
          }
