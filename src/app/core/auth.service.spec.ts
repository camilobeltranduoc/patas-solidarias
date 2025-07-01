/**
 * @file Pruebas básicas de AuthService (login / logout).
 */
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';

describe('AuthService', () => {

  const fakeUser$ = new BehaviorSubject<any>(null);
  const authStub = {
    // simulamos signInWithEmailAndPassword
    signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'ABC' } }),
    signOut: () => Promise.resolve()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authStub }
      ]
    });
  });

  it('login() devuelve el UID del usuario', async () => {
    const service = TestBed.inject(AuthService);
    const cred = await service.login('test@mail.com', 'pass123');
    expect(cred.user.uid).toBe('ABC');
  });

  it('logout() resuelve sin errores', async () => {
    const service = TestBed.inject(AuthService);
    await expectAsync(service.logout()).toBeResolved();
  });
});
