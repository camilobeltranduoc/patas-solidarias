/**
 * ===============================================
 * Servicio: DonationService
 * Archivo: src/app/core/donation.service.ts
 * Descripción:
 * Servicio encargado de gestionar las donaciones realizadas por los usuarios.
 * Utiliza Firebase Firestore para registrar y consultar las donaciones,
 * y coordina con `CampaignService` para actualizar el monto recaudado (`raised`)
 * en campañas específicas.
 * ===============================================
 */
import { Injectable,inject} from '@angular/core';
import {
  Firestore, collection, CollectionReference,
  addDoc, collectionData, query, orderBy, where,
  increment, doc, updateDoc, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService }      from './auth.service';
import { CampaignService }  from './campaign.service';

export interface Donation {
  id?: string;
  amount: number;
  date:   number;
  uid:    string;
  campaignId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class DonationService {

  private fs     = inject(Firestore);
  private auth   = inject(AuthService);
  private campSv = inject(CampaignService);

  private col: CollectionReference = collection(this.fs, 'donations');

  /** Paso 1 (Firestore) + Paso 2 (HTTP json‑server) */
  add(amount: number, campaignId: number | null) {
    // -- 1️⃣  Firestore -----------------------------
    return addDoc(this.col, {
      amount,
      date: Date.now(),
      uid : this.auth.uid,
      campaignId
    }).then(() => {
      // -- 2️⃣  actualizar raised en json‑server -----
      if (campaignId == null) { return; }
      return this.campSv.raise(campaignId, amount).toPromise();
    });
  }

  /** Lista mis donaciones ordenadas desc */
  list$(): Observable<Donation[]> {
    const q = query(
      this.col,
      where('uid', '==', this.auth.uid),
      orderBy('date', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Donation[]>;
  }
}
