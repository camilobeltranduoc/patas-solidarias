/**
 * ===============================================
 * Servicio: AlertService
 * Archivo: alert.service.ts
 * Descripción:
 * Servicio global responsable de emitir mensajes de alerta a la interfaz.
 * Utiliza un Subject para transmitir eventos de alerta de tipo `success`, `danger`, `info` o `warning`.
 * Los componentes pueden suscribirse al observable `msg$` para reaccionar a nuevas alertas.
 * ===============================================
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  text: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _msg = new Subject<Alert>();
  /** Observable que los componentes escuchan */
  readonly msg$ = this._msg.asObservable();

  open(text: string, type: Alert['type'] = 'success') {
    this._msg.next({ text, type });
  }
}