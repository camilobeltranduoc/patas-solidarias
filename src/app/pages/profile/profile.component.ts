import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Auth, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user$!: Observable<any>;           
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: Auth,
    private authService: AuthService,
    private router: Router
  ) {
    /* ahora SÍ tenemos los servicios inyectados */
    this.user$ = this.authService.user$;

    this.form = this.fb.group({
      displayName: ['', Validators.required]
    });

    // Pre-rellenar nombre visible
    this.user$.subscribe(u => {
      if (u) this.form.patchValue({ displayName: u.displayName ?? '' });
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) { return; }
    try {
      const name = this.form.value.displayName!;
      if (this.afAuth.currentUser) {
        await updateProfile(this.afAuth.currentUser, { displayName: name });
        alert('Perfil actualizado ✅');
        this.form.markAsPristine();
      }
    } catch (err:any) {
      alert(err.message);
    }
  }

  logout() {
    this.authService.logout().then(() => this.router.navigateByUrl('/'));
  }
}
