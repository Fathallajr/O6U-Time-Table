import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'http://systemuniversity.runasp.net/api/Student';

  getQrCode(studentCode: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/qrcode/${studentCode}`, {
      responseType: 'blob'
    });
  }
}