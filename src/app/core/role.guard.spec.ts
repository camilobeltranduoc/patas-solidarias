import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, RedirectCommand } from '@angular/router';
import { BehaviorSubject, firstValueFrom, defer, isObservable, of, Observable } from 'rxjs';

import { roleGuard } from './role.guard';
import { AuthService } from './auth.service';

class MockAuthService {
  private _role$ = new BehaviorSubject<'admin' | 'user'>('user');
  get role$() { return this._role$.asObservable(); }
  setRole(role: 'admin' | 'user') { this._role$.next(role); }
}

describe('roleGuard (functional)', () => {
  let mockAuth: MockAuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = { url: '/test' } as RouterStateSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: routerSpy },
      ],
    });

    mockAuth = TestBed.inject(AuthService) as unknown as MockAuthService;
  });

  /** Helper robusto explicado arriba */
  function runGuardWithAllowed(
  allowed: ('admin' | 'user')[]
): Observable<boolean | UrlTree | RedirectCommand> {

  return defer(() => {
    const raw = TestBed.runInInjectionContext(() =>
      roleGuard(allowed)(dummyRoute, dummyState)
    );
    return isObservable(raw) ? raw : of(raw as boolean | UrlTree | RedirectCommand);
  });
}
  it('permite cuando el rol está autorizado', async () => {
    mockAuth.setRole('admin');
    const result = await firstValueFrom(runGuardWithAllowed(['admin']));
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('bloquea y redirige cuando el rol no está autorizado', async () => {
    mockAuth.setRole('user');
    const result = await firstValueFrom(runGuardWithAllowed(['admin']));
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
  });

  it('permite cualquiera de los roles autorizados', async () => {
    mockAuth.setRole('user');
    const result = await firstValueFrom(runGuardWithAllowed(['admin', 'user']));
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  //  lista de roles permitidos vacía  → siempre bloquea
  it('bloquea y redirige cuando la lista de roles permitidos está vacía', async () => {
    mockAuth.setRole('admin');          // da igual el rol
    const result = await firstValueFrom(runGuardWithAllowed([]));
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
    });

    // rol “desconocido” (guest) no debe pasar
  it('bloquea y redirige cuando el rol no es ni admin ni user', async () => {
    mockAuth.setRole('guest' as any);   // forzamos un rol fuera del dominio
    const result = await firstValueFrom(runGuardWithAllowed(['admin', 'user']));
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
    });

    // lista con duplicados sigue permitiendo al rol válido
  it('permite cuando el rol está en una lista con duplicados', async () => {
    mockAuth.setRole('admin');
    const result = await firstValueFrom(runGuardWithAllowed(['admin', 'admin']));
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
});
