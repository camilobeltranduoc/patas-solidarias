/**
 * ===============================================
 * Componente: LoginComponent
 * Archivo: src/app/pages/login/login.component.ts
 * Descripción:
 * Componente standalone que gestiona el inicio de sesión de usuarios.
 * Utiliza formularios con `NgForm`, validación mínima,
 * y redirige al usuario a la página principal tras autenticarse exitosamente.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(f: NgForm): void {
    if (f.invalid) { return; }

    this.loading = true;
    const { email, pass } = f.value;

    this.auth.login(email, pass)
      .then(() => this.router.navigateByUrl('/'))
      .catch(err => alert(err.message))
      .finally(() => this.loading = false);
  }
}
