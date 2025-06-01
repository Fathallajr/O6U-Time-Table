import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, map, of, throwError } from 'rxjs';

// Interfaces 
export interface ApiUser {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  studentCode: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  studentCode: number;
}

export interface LoginResponse {
  token: string;
  user: ApiUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://http://systemuniversity.runasp.net/api/Auth';

  // --- Constants for localStorage keys ---
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'authUser'; 

  // --- Initialize userSubject by attempting to load from storage ---
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$: Observable<User | null> = this.userSubject.asObservable();
  isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(map(user => !!user));


  // --- Method to load user from localStorage on service init ---
  private getUserFromStorage(): User | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const storedUser = localStorage.getItem(this.USER_KEY);

    if (token && storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        console.log('User loaded from storage:', user);
        return user;
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        return null;
      }
    }
    // If no token or no user stored, return null
    return null;
  }

  login(credentials: { email: string; password: string }): Observable<User | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.token);

          const user: User = {
            id: response.user.id,
            email: response.user.email,
            name: response.user.fullName,
            studentCode: response.user.studentCode,
            photoUrl: 'assets/img/default-avatar.png' 
          };

          // --- Store the user object as well ---
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));

          this.userSubject.next(user);
        }),
        map(response => this.userSubject.value),
        catchError(error => {
          console.error('Login failed:', error);
          this.clearUser(); 
          return throwError(() => new Error('Login failed. Please check your credentials.'));
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    this.clearUser(); 
  }

  // --- Central method to clear auth state and storage ---
  clearUser() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY); 
    this.userSubject.next(null); 
  }
}