import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // Added Router for navigation after login
  ) {
    // Define the form controls here
    this.form = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // No need to reinitialize the form here if it's already in the constructor
    // If you need additional logic, you can add it here
  }

  get userEmail() {
    return this.form.get('userEmail');
  }

  get password() {
    return this.form.get('password');
  }

  handleSubmitForm() {
    if (this.form.valid) {
      const credentials = {
        email: this.userEmail?.value, // الآن يستخدم email بدلاً من username
        password: this.password?.value,
      };

      this.authService.login(credentials).pipe(
        tap(response => {
          if (response && response.token) {
            this.authService.saveToken(response.token);
            this.router.navigate(['/admin']); // Redirect to dashboard or another route
          }
        }),
        catchError(error => {
          console.error('Login failed', error);
          if (error.error && error.error.message) {
            console.error('Error message:', error.error.message);
          } else {
            console.error('Error details:', error);
          }
          return of(null);
        })
      ).subscribe();
    }
  }
}
