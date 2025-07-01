import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(f: NgForm): void {
    if (f.invalid || f.value.pass !== f.value.pass2) {
      alert('Las contraseñas no coinciden'); return;
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
