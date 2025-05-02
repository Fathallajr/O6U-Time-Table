import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-schedule-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-display.component.html',
  styleUrls: ['./schedule-display.component.css']
})
export class ScheduleDisplayComponent implements OnInit {
  pdfUrl: string | null = null;
  safePdfUrl: SafeResourceUrl | null = null;
  errorMessage: string | null = null;

  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const state = history.state as { pdfUrl: string }; 

    console.log('Attempting to read history.state:', history.state); // Log what history.state contains

    if (state?.pdfUrl) {
      this.pdfUrl = state.pdfUrl;
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      console.log('Received PDF URL via history.state:', this.pdfUrl);
      this.errorMessage = null;
    } else {
      if (typeof state?.pdfUrl === 'undefined') {
          console.error('PDF URL property not found in history.state:', state);
      } else {
          console.error('PDF URL in history.state is null or empty:', state?.pdfUrl);
      }
      this.errorMessage = 'Could not load schedule PDF URL. Please go back and try again.';
      this.safePdfUrl = null; 
    }
  }

  goBack(): void {
    this.router.navigate(['/level']);
  }
}