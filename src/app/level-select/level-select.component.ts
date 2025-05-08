import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { finalize } from 'rxjs/operators'; 

// Define an interface for the expected API response
interface ScheduleResponse {
  id: number;
  level: number;
  studentSchedule: string;
}

@Component({
  selector: 'app-level-select',
  standalone: true,
  imports: [ CommonModule ], 
  templateUrl: './level-select.component.html',
  styleUrls: ['./level-select.component.css']
})
export class LevelSelectComponent {
  levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
  isLoading = false;
  errorMessage: string | null = null;

  
  private apiBaseUrl = 'https://localhost:7046';

  private router = inject(Router);
  private http = inject(HttpClient); // Inject HttpClient

  select(levelString: string): void {

    const levelMatch = levelString.match(/\d+/);
    if (!levelMatch) {
      this.errorMessage = `Invalid level format: ${levelString}`;
      return;
    }
    const levelNumber = parseInt(levelMatch[0], 10);

    this.isLoading = true;
    this.errorMessage = null; // Reset error message

    const apiUrl = `${this.apiBaseUrl}/api/Student/level/${levelNumber}`;
    console.log(`Fetching schedule from: ${apiUrl}`);

    this.http.get<ScheduleResponse>(apiUrl)
      .pipe(
        finalize(() => this.isLoading = false) 
      )
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          if (response && response.studentSchedule) {

            const pdfPath = response.studentSchedule.startsWith('/')
                              ? response.studentSchedule
                              : '/' + response.studentSchedule;
            const fullPdfUrl = this.apiBaseUrl + pdfPath;

            console.log(`Navigating to schedule display with URL: ${fullPdfUrl}`);
        
            this.router.navigate(['/schedule'], { state: { pdfUrl: fullPdfUrl } });
          } else {
            this.errorMessage = `Schedule data not found for Level ${levelNumber}.`;
            console.error('Invalid response structure:', response);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('API Error:', err);
          if (err.status === 404) {
            this.errorMessage = `No schedule found for Level ${levelNumber}.`;
          } else {
             this.errorMessage = `Failed to load schedule for Level ${levelNumber}. Please try again later. (Status: ${err.status})`;
          }
        }
      });
  }

  back() {
    this.router.navigate(['/login']);
  }
}