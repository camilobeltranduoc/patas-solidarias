/**
 * ===============================================
 * Componente: DonateComponent
 * Archivo: src/app/pages/donate/donate.component.ts
 * Descripción:
 * Componente standalone que permite a los usuarios realizar donaciones.
 * Valida el monto mínimo, asocia la donación con una campaña (si aplica),
 * y evita que administradores accedan a esta funcionalidad.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, Validators, FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DonationService } from '../../core/donation.service';
import { AuthService }     from '../../core/auth.service';

@Component({
  selector   : 'app-donate',
  standalone : true,
  imports    : [CommonModule, ReactiveFormsModule],
  templateUrl: './donate.component.html',
  styleUrls  : ['./donate.component.scss']
})
export class DonateComponent {

  form: FormGroup;
  campaignId?: number;          // 🆔 campaña

  constructor(
    private fb       : FormBuilder,
    private route    : ActivatedRoute,
    private router   : Router,
    private donation : DonationService,
    private auth     : AuthService
  ) {

    /* ① formulario */
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1000)]]
    });

    /* ② lee ?id=… */
    const id = this.route.snapshot.queryParamMap.get('id');
    this.campaignId = id ? Number(id) : undefined;

    /* ③ si el rol es admin, redirige a Home  */
    this.auth.role$.subscribe(role => {
      if (role === 'admin') this.router.navigate(['/']);
    });
  }

  /* guardar donación */
  submit(): void {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }

  const amount = this.form.value.amount as number;

  this.donation.add(amount, this.campaignId ?? null)
      .then(() => window.alert(`¡Gracias por donar $${amount}!`))
      .catch(err => window.alert(err.message));

  this.form.reset();
  }

}
