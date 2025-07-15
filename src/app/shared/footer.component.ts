/**
 * ===============================================
 * Componente: FooterComponent
 * Archivo: src/app/shared/footer.component.ts
 * Descripción:
 * Componente standalone que representa el pie de página de la aplicación.
 * Muestra dinámicamente el año actual mediante la propiedad `year`.
 * Usado comúnmente en la plantilla principal para contenido fijo al final del sitio.
 * ===============================================
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
}