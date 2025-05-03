import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit {
  studentCode: number | null = null;
  qrCodeUrl: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}

  generateQrCode(): void {
    if (!this.studentCode) {
      this.errorMessage = 'Please enter a valid student code';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.qrCodeUrl = null;

    this.projectService.getQrCode(this.studentCode).subscribe({
      next: (blob: Blob) => {
        // Create a URL for the blob
        this.qrCodeUrl = URL.createObjectURL(blob);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching QR code:', error);
        this.errorMessage = 'Failed to generate QR code. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Clean up object URL when component is destroyed
  ngOnDestroy(): void {
    if (this.qrCodeUrl) {
      URL.revokeObjectURL(this.qrCodeUrl);
    }
  }
}
