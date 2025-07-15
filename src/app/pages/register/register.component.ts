/**
 * ===============================================
 * Componente: RegisterComponent
 * Archivo: src/app/pages/register/register.component.ts
 * Descripción:
 * Componente standalone encargado del registro de nuevos usuarios.
 * Utiliza `NgForm` para validación de formularios, y aplica una expresión regular
 * que asegura contraseñas fuertes (mayúscula, minúscula, número, símbolo, sin espacios).
 * Al completar el registro, redirige al login.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

/* ── RegEx contraseña fuerte ──────────────────────────
 *  min 8  – max 20 caracteres
 *  1 mayúscula, 1 minúscula, 1 dígito, 1 símbolo
 *  sin espacios
 * ---------------------------------------------------- */
const strongPass =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,20}$/;

@Component({
  selector   : 'app-register',
  standalone : true,
  imports    : [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls  : ['./register.component.scss']
})
export class RegisterComponent {

  /** lo usaremos en template con [pattern]="passPattern"  */
  passPattern = strongPass;

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(f: NgForm): void {

    /* 1. Validaciones de plantilla */
    if (f.invalid) { return; }

    /* 2. Contraseñas iguales */
    if (f.value.pass !== f.value.pass2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.loading = true;
    const { email, pass } = f.value;

    this.auth.signUp(email, pass)
      .then(() => {
        alert('¡Registro exitoso! Inicia sesión.');
        this.router.navigateByUrl('/login');
      })
      .catch(err => alert(err.message))
      .finally(() => this.loading = false);
  }
}
