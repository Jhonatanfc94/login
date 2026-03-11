import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../servicios/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public mensajeError: string = '';

  public onSubmit(): void {
    if (this.loginForm.valid) {
      // Separamos los valores para enviarlos como el servicio los pide
      const usuario = this.loginForm.value.username as string;
      const contraseña = this.loginForm.value.password as string;

      this.authService.login(usuario, contraseña).subscribe({
        next: (res: any) => {
          console.log('Login OK', res);
          this.router.navigate(['/confirmacion']);
        },
        error: (err: any) => {
          this.mensajeError = err.error?.message || 'Error de conexión';
        }
      });
    }
  }
}