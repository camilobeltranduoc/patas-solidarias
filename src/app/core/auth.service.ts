/**
 * ===============================================
 * Servicio: AuthService
 * Archivo: auth.service.ts
 * Descripción:
 * Servicio centralizado para autenticación de usuarios con Firebase Auth.
 * Permite registrar, iniciar sesión, cerrar sesión, recuperar contraseña,
 * y obtener el rol del usuario desde Firestore.
 * También expone el estado de autenticación de forma reactiva.
 * ===============================================
 */
import { Injectable, inject } from '@angular/core';
import {
  Auth, User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged,
  sendPasswordResetEmail 
} from '@angular/fire/auth';

import {
  Firestore, doc, setDoc, getDoc, docData
} from '@angular/fire/firestore';

import { BehaviorSubject, of, switchMap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private afAuth = inject(Auth);
  private fs     = inject(Firestore);

  /* -------- usuario Firebase -------- */
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  /* -------- rol leído desde Firestore -------- */
  role$ = this.user$.pipe(
    switchMap(u => u
      ? docData(doc(this.fs, 'users', u.uid)).pipe(
          map(d => (d as any)?.role ?? 'user')   // default "user"
        )
      : of(null)
    )
  );

  constructor() {
    onAuthStateChanged(this.afAuth, u => this._user.next(u));
  }

  /* ---------- Registro: crea doc users/{uid} ---------- */
  async signUp(email: string, pass: string) {
    const cred = await createUserWithEmailAndPassword(this.afAuth, email, pass);
    await setDoc(
      doc(this.fs, 'users', cred.user.uid),
      { role: 'user', email }                 // puedes guardar + datos
    );
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.afAuth, email, pass);
  }

  logout() { return signOut(this.afAuth); }

  get uid()  { return this._user.value?.uid ?? ''; }

  /** acceso sincrónico al rol (útil en guards) */
  async getRole(): Promise<'admin'|'user'|null> {
    if (!this.uid) return null;
    const snap = await getDoc(doc(this.fs, 'users', this.uid));
    return (snap.data() as any)?.role ?? 'user';
  }

  /** Envía correo de restablecimiento */
  reset(email: string) {
    return sendPasswordResetEmail(this.afAuth, email);
  }

}
