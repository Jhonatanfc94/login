import { Component, inject, signal } from '@angular/core';
import { AuthServiceService } from '../servicios/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule , MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  username = signal('');
  email = signal('');
  password = signal('');

  constructor(private authService: AuthServiceService, private router: Router) {}

  updateUsername(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.username.set(target.value);
    }
  }

  // Método para actualizar el email
  updateEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.email.set(target.value);
    }
  }

  updatePassword(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.password.set(target.value);
    }
  }

  onRegister() {
    const username = this.username();
    const password = this.password();

    this.authService.register(username, password).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/']);
        this.openSnackBar('Se registro correctamente. ', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al registrar el usuario', error);
        this.openSnackBar('Registro incorrecto, es posible que ya exista este usuario. ', 'Cerrar');
      }
    });
  }
  
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }
}
