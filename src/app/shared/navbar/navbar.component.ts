import { Component, inject } from '@angular/core'; 
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, NgIf, AsyncPipe ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router); 

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}