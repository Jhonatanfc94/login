import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../servicios/auth-service.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registroForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public mensajeError: string = '';

  public onSubmit(): void {
    if (this.registroForm.valid) {
      this.authService.registro(this.registroForm.value).subscribe({
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