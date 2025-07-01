import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/navbar.component';   
import { FooterComponent } from './shared/footer.component';   
import { AlertComponent } from './shared/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AlertComponent 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}