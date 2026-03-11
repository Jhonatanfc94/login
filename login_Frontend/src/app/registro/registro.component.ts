import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../servicios/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  registroForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  mensajeError = '';

  public onSubmit(): void {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value.username as string;
      const contraseña = this.registroForm.value.password as string;

      // ¡Aquí está el cambio! Usamos .register en lugar de .registro
      this.authService.register(usuario, contraseña).subscribe({
        next: (response: any) => {
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.mensajeError = err.error?.message || 'Error al registrar';
        }
      });
    }
  }
}