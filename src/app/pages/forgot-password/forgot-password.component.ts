/**
 * ===============================================
 * Componente: ForgotPasswordComponent
 * Archivo: src/app/pages/forgot-password/forgot-password.component.ts
 * Descripción:
 * Componente standalone que permite a los usuarios solicitar un
 * restablecimiento de contraseña mediante su correo electrónico.
 * Utiliza un formulario reactivo y el servicio de autenticación (`AuthService`)
 * para enviar el correo de recuperación.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder, ReactiveFormsModule, Validators
} from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  // inyección directa
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  sent = false;
  error = '';

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const email = this.form.value.email as string;

    this.auth.reset(email)
        .then(() => this.sent = true)
        .catch(err => this.error = err.message);
  }
}
