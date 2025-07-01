import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private afAuth = inject(Auth);

  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  constructor() {
    onAuthStateChanged(this.afAuth, u => this._user.next(u));
  }

  signUp(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, pass);
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.afAuth, email, pass);
  }

  logout() {
    return signOut(this.afAuth);
  }

  get uid() { return this._user.value?.uid ?? ''; }
}
