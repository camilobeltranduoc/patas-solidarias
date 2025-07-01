import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
