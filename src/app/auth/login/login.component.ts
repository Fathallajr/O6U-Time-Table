import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService, User } from '../../services/auth.service';
import { finalize } from 'rxjs/operators'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    CommonModule, 
    ReactiveFormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;


  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null; 
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true; 
    const credentials = this.loginForm.value;
    console.log('Attempting login with:', credentials);

    this.authService.login(credentials)
      .pipe(
          finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (user) => {
          if (user) {
            console.log('Login successful, user:', user);
            this.router.navigate(['/level']);
          } else {
             console.error('Login seemed successful but no user data received.');
             this.errorMessage = 'Login failed. Please try again later.';
          }
        },
        error: (err) => {
          console.error('Login subscription error:', err);
          this.errorMessage = err.message || 'Login failed. Please check your credentials.';
          this.loginForm.patchValue({ password: '' });
        }
      });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}