// src/app/shared/navbar/navbar.component.ts
import { Component }                      from '@angular/core';
import { RouterLink, RouterLinkActive }   from '@angular/router';
import { NgIf, AsyncPipe }                from '@angular/common';
import { AuthService, User }              from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, NgIf, AsyncPipe ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // خلي ال property بدون initializer
  user$!: Observable<User|null>;

  constructor(private auth: AuthService) {
    // واديها القيمة جوّه الكونستركتور
    this.user$ = this.auth.currentUser$;
    }
  }
