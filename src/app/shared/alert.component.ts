/**
 * ===============================================
 * Componente: AlertComponent
 * Archivo: src/app/shared/alert.component.ts
 * Descripción:
 * Componente standalone que muestra mensajes de alerta temporales (tipo toast).
 * Escucha el observable `msg$` del `AlertService` y muestra el mensaje recibido
 * durante 3 segundos antes de ocultarlo automáticamente.
 * Soporta tipos de alerta: 'success', 'danger', 'info', 'warning'.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, Alert } from '../core/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  alert: Alert | null = null;

  constructor(private alertSvc: AlertService) {
    /** Cada vez que llega un mensaje lo mostramos 3 s */
    this.alertSvc.msg$.subscribe(a => {
      this.alert = a;
      setTimeout(() => (this.alert = null), 3000);
    });
  }
}
