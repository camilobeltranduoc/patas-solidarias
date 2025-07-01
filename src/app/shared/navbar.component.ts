import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  auth = inject(AuthService);
}