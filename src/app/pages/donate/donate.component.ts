import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import { AlertService } from '../../core/alert.service';
import { DonationService } from '../../core/donation.service';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private donation: DonationService
  ) {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1000)]]
    });
  }

  submit(): void {
    console.log('submit invocado');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const amount = this.form.value.amount as number;

    this.donation.add(amount).then(() => {
      window.alert(`¡Gracias por donar $${amount}!`);
    });

    this.form.reset();
  }
}
