/**
 * ===============================================
 * Componente: MyDonationsComponent
 * Archivo: src/app/pages/my-donations/my-donations.component.ts
 * Descripción:
 * Componente standalone que muestra al usuario un listado de sus donaciones realizadas.
 * Carga las donaciones desde Firestore a través del servicio `DonationService`.
 * Incluye una función placeholder para generar un recibo en PDF por cada donación.
 * ===============================================
 */
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
