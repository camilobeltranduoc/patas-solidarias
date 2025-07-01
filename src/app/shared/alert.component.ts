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
