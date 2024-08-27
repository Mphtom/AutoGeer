import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service'; 
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegistration = new EventEmitter<void>();

  totalItems = 0;
  login: boolean = false; 
  userName: string = "";

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.login = this.authService.isLoggedIn();
    if (this.login) {
      this.userName = "mostapha";
    }

    this.cartService.totalItems$.subscribe(total => {
      this.totalItems = total;
    });
  }

  logOut(): void {
    this.authService.logout();
    this.login = false;
    this.userName = "";
  }

  openLoginModal(): void {
    this.openLogin.emit();
  }

  openRegistrationModal(): void {
    this.openRegistration.emit();
  }
}
