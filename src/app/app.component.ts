// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';  // عدّل المسار لو مختلف

@Component({
  selector: 'app-root',
  standalone: true,               // خلي الـ AppComponent standalone
  imports: [
    RouterOutlet,
    LoginComponent                // ضيف هنا اللوجين
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'o6u-Time-Table';
}
