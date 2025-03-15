import { Component, signal } from '@angular/core';
import { AuthServiceService } from '../servicios/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule , MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = signal('');
  password = signal('');

  constructor(private authService: AuthServiceService, private router: Router) {}

  updateUsername(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.username.set(target.value);
    }
  }

  updatePassword(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.password.set(target.value);
    }
  }

  onLogin() {
    this.authService.login(this.username(), this.password()).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
      },
      error: (error) => {
        console.error('Error al hacer login', error);
      }
    });
  }

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }
}
