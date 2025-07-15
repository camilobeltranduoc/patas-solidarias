/**
 * ===============================================
 * Componente: App (componente raíz)
 * Archivo: app.component.ts (o app.ts si está renombrado)
 * Descripción: Define el punto de entrada de la aplicación.
 * Contiene elementos persistentes como Navbar, Footer y Alertas.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/navbar.component';   
import { FooterComponent } from './shared/footer.component';   
import { AlertComponent } from './shared/alert.component';
import { AuthService } from './core/auth.service'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AlertComponent 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  constructor(public auth: AuthService) {
    // Solo para debug: lo expongo en la consola del navegador
    (window as any).auth = this.auth;
  }
}