          import { Component, EventEmitter, Output } from '@angular/core';
          import { RouterLink, RouterLinkActive } from '@angular/router';

          @Component({
            selector: 'app-nav',
            standalone: true,
            imports: [RouterLink,RouterLinkActive],
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
          
          }
