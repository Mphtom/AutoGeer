import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, retry, throwError } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';
email: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getemail() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmitForm(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';
      console.log('Form data before submission:', this.loginForm.value);
      this.http
        .post('https://auto-gear.vercel.app/login', this.loginForm.value)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe({
          next: (response: any) => {
            console.log('Login response:', response);
            if (response && response.token) {
              console.log('Token:', response.token);
              this.authService.setToken(response.token);

              const redirectUrl = this.authService.getRedirectUrl();
              if (redirectUrl) {
                this.authService.clearRedirectUrl();
                alert('Login successful! Redirecting...');
                this.router.navigate([redirectUrl]);
              } else {
                alert('Login successful! Redirecting to homepage...');
                this.router.navigate(['/']);
              }

            } else {
              console.error('Invalid response format:', response);
              this.errorMessage = 'Login successful, but there was an issue with the server response. Please try again.';
            }
          },
          error: (error: any) => {
            console.error('Login error:', error);
            this.errorMessage = error;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please enter a valid email and password.';
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error details:', error);
    if (error.status === 0) {
      return throwError(() => 'Unable to connect to the server. Please check your internet connection and try again.');
    } else if (error.status === 401) {
      return throwError(() => 'Login failed: Invalid email or password.');
    } else {
      return throwError(() => 'An unexpected error occurred. Please try again later.');
    }
  }
}

