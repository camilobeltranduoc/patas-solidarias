/**
 * ===============================================
 * Componente: CampaignsComponent
 * Archivo: src/app/pages/campaigns/campaigns.component.ts
 * Descripción:
 * Componente standalone encargado de mostrar, crear y eliminar campañas.
 * Utiliza formularios con `NgForm`, muestra el progreso de recaudación
 * y adapta el color de la barra de progreso según el porcentaje alcanzado.
 * ===============================================
 */
import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  RouterLink, RouterLinkActive, RouterLinkWithHref
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService }         from '../../core/auth.service';
import { CampaignService,
         Campaign }            from '../../core/campaign.service';

@Component({
  selector: 'app-campaigns',
  standalone : true,
  imports    : [
    CommonModule, FormsModule,
    RouterLink, RouterLinkActive, RouterLinkWithHref   // 👈 directivas router
  ],
  templateUrl: './campaigns.component.html',
  styleUrls  : ['./campaigns.component.scss']
})
export class CampaignsComponent {

  auth = inject(AuthService);
  public cs = inject(CampaignService);

  campaigns$: Observable<Campaign[]> = this.cs.getAll();
  loading = false;

  /* -------- helper reutilizable -------- */
  private reload() {
    this.campaigns$ = this.cs.getAll();
  }

  /* ---------- crear campaña (POST) ----- */
  save(f: NgForm) {
  if (f.invalid) { return; }

  const { title, goal, description } = f.value;
  const body = { title, goal: +goal, description };

  this.loading = true;
  this.cs.create(body).subscribe({
    next: () => {
      /* ① limpiar formulario ----------------------- */
      f.resetForm();
      /* ② volver a leer la colección --------------- */
      this.campaigns$ = this.cs.getAll();
    },
    error: err => alert(err.message),
    complete: () => this.loading = false
  });
}

  /* ---------- eliminar campaña --------- */
  delete(id: number) {
    this.cs.delete(id).subscribe(() => this.reload());
  }

  /* porcentaje alcanzado respecto a la meta */
  percent(c: Campaign): number {
    const raised = (c as any).raised ?? 0;
    return Math.min(100, Math.round(raised * 100 / c.goal));
  }

  /* clase Bootstrap según el % */
  barClass(c: Campaign) {
    const p = this.percent(c);
    if (p >= 75) return 'bg-primary';
    if (p >= 50) return 'bg-info';
    if (p >= 25) return 'bg-warning';
    return 'bg-danger';
  }
}
