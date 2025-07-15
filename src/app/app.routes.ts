/**
 * ===============================================
 * Archivo: app.routes.ts
 * Descripción: Define las rutas principales de la aplicación Angular.
 * Cada ruta enlaza una URL con su respectivo componente.
 * ===============================================
 */

import { Routes } from '@angular/router';

import { HomeComponent }        from './pages/home/home.component';
import { AnimalsComponent }     from './pages/animals/animals.component';
import { CampaignsComponent }   from './pages/campaigns/campaigns.component';
import { DonateComponent }      from './pages/donate/donate.component';
import { MyDonationsComponent } from './pages/my-donations/my-donations.component';
import { ProfileComponent }     from './pages/profile/profile.component';
import { LoginComponent }       from './pages/login/login.component';
import { RegisterComponent }    from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '',               component: HomeComponent },
  { path: 'mascotas',       component: AnimalsComponent },
  { path: 'campanas',       component: CampaignsComponent },
  { path: 'donar',          component: DonateComponent },
  { path: 'mis-donaciones', component: MyDonationsComponent },
  { path: 'perfil',         component: ProfileComponent },
  { path: 'login',          component: LoginComponent },
  { path: 'registro',       component: RegisterComponent },
  { path: 'recuperar',      component: ForgotPasswordComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];