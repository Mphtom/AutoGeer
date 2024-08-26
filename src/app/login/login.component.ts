import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
 

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get userEmail() {
    return this.loginForm.get('userEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmitForm() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
    }
  }
}
