import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router'; // Import RouterModule


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, NgStyle, RouterModule, RouterLink], // Add RouterModule here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Correct styleUrls
})
export class AdminComponent{

  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }


}
