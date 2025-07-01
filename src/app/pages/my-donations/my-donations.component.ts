
import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DonationService, Donation } from '../../core/donation.service';

@Component({
  selector: 'app-my-donations',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss']
})
export class MyDonationsComponent {

  donations$!: Observable<Donation[]>;         

  constructor(private donation: DonationService) {
    this.donations$ = this.donation.list$();   
  }

  /** Generar recibo PDF (placeholder) */
  pdf(d: Donation): void {
    // Aquí pondrás jsPDF o tu lógica
    console.log('Generar PDF para', d);
    alert(`PDF pendiente para la donación ${d.id}`);
  }
}
