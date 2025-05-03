import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7046/api/Project';

  getQrCode(studentCode: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/qrcode/${studentCode}`, {
      responseType: 'blob'
    });
  }
}