import { Injectable } from '@angular/core';
import {
  Firestore, collection, CollectionReference,
  addDoc, collectionData, query, orderBy, where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';   // ← ruta relativa correcta

export interface Donation {
  id?: string;
  amount: number;
  date: number;
  uid: string;
}

@Injectable({ providedIn: 'root' })
export class DonationService {

  private col: CollectionReference;

  constructor(
    private fs: Firestore,
    private auth: AuthService
  ) {
    this.col = collection(this.fs, 'donations');
  }

  /** Guarda la donación */
  add(amount: number) {
    return addDoc(this.col, {
      amount,
      date: Date.now(),
      uid: this.auth.uid
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
