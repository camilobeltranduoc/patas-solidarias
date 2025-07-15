/**
 * ===============================================
 * Servicio: CampaignService
 * Archivo: src/app/core/campaign.service.ts
 * Descripción:
 * Servicio encargado de interactuar con la API REST para gestionar campañas.
 * Permite obtener, crear, actualizar, eliminar campañas y aumentar su monto recaudado.
 * Utiliza `HttpClient` y se comunica con el endpoint: `${apiUrl}/campaigns`.
 * ===============================================
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Campaign {
  id?: number;
  title: string;
  goal: number;
  raised?: number;         
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/campaigns`;

  getAll()             { return this.http.get<Campaign[]>(this.url); }
  get(id: number)      { return this.http.get<Campaign>(`${this.url}/${id}`); }
  create(c: { title: string; goal: number; description: string }) {
  return this.http.post<Campaign>(this.url, c);
 }
  update(c: Campaign)  { return this.http.put(`${this.url}/${c.id}`, c); }
  delete(id: number)   { return this.http.delete(`${this.url}/${id}`); }

  /** Incrementa raised en +amount (PUT) */
  raise(id: number, amount: number) {
    return this.get(id).pipe(
      switchMap(c => this.http.put(`${this.url}/${id}`, {
        ...c,
        raised: (c.raised ?? 0) + amount
      }))
    );
  }
}
