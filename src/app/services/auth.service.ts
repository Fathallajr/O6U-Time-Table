import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  photoUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.userSubject.asObservable();

  /** بعد ما تعمل login ناجح تبعتهالداتا دي */
  setUser(user: User) {
    this.userSubject.next(user);
  }

  /** لو عمل logout مثلاً */
  clearUser() {
    this.userSubject.next(null);
  }
}
