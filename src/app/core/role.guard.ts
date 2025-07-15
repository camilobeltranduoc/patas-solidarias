/**
 * ===============================================
 * Guard: roleGuard
 * Archivo: src/app/core/role.guard.ts
 * Descripción:
 * Función guard que protege rutas según el rol del usuario ('admin' o 'user').
 * Verifica el rol obtenido desde `AuthService` y permite o bloquea el acceso.
 * Si el rol no está autorizado, redirige al usuario al inicio ('/').
 * ===============================================
 */
import { inject } from '@angular/core';
import {
  CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export function roleGuard(allowed: ('admin'|'user')[]): CanActivateFn {

  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.role$.pipe(
      map(role => {
        if (allowed.includes(role)) {
          return true;                   // ✔ puede pasar
        }
        // ❌ redirección a “sin-permiso”
        router.navigate(['/']);
        return false;
      })
    );
  };
}
