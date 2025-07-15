/**
 * ===============================================
 * Componente: HomeComponent
 * Archivo: src/app/pages/home/home.component.ts
 * Descripción:
 * Componente standalone que representa la página de inicio (landing page) de la aplicación.
 * Se encarga de mostrar contenido general al usuario cuando accede a la raíz del sitio.
 * Actualmente no tiene lógica en TypeScript, solo estructura visual definida en su HTML/SCSS.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}