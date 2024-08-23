
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

// Define the form data interface
interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Corrected from styleUrl to styleUrls
})
export class RegistrationComponent {
  form: RegistrationForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit(registrationForm: NgForm): void {
    if (registrationForm.valid) {
      console.log('Form Submitted:', this.form);
    } else {
      console.log('Form is invalid');
    }
  }
}
