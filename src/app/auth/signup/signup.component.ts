import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { finalize } from 'rxjs/operators'; 

interface RegistrationResponse {
  message: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;


  private apiBaseUrl = 'https://systemuniversity.runasp.net/api/Auth'; 

  // Use inject() for dependencies
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit() {
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      studentCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  // Custom validator for matching passwords
  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (pass && confirm && pass !== confirm && group.get('confirmPassword')?.dirty) {
        return { mismatch: true };
    }
    return null;
  }


  onSubmit() {
    this.errorMessage = null;
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.invalid) {
       console.log('Form is invalid:', this.signUpForm.errors);
       
       if (!this.signUpForm.errors?.['mismatch'] && this.signUpForm.get('confirmPassword')?.value !== this.signUpForm.get('password')?.value){
         
       }
       return; 
    }


    this.isLoading = true;

    const { fullName, studentCode, email, password } = this.signUpForm.value;
    const payload = { 
      fullName, 
      studentCode: Number(studentCode), 
      email, 
      password 
    };
    const registerUrl = `${this.apiBaseUrl}/register`;

    console.log('Attempting registration with payload:', payload);

    this.http.post<RegistrationResponse>(registerUrl, payload)
      .pipe(
        finalize(() => this.isLoading = false) 
      )
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response.message);
          alert('Registration successful! Please log in.'); 
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Registration failed:', err);
          if (err.error && typeof err.error === 'string') {
             this.errorMessage = err.error; 
          } else if (err.error && err.error.message) {
             this.errorMessage = err.error.message; 
          } else if (err.status === 400) {
             // Check for student code already exists error
             if (err.error && err.error.includes && err.error.includes('Student code already exists')) {
               this.errorMessage = 'Registration failed. This student code is already registered.';
             } else {
               this.errorMessage = 'Registration failed. The email might already be in use or input is invalid.';
             }
          } else {
             this.errorMessage = `An unexpected error occurred (Status: ${err.status}). Please try again.`;
          }

           this.signUpForm.patchValue({ password: '', confirmPassword: '' });
           this.signUpForm.get('password')?.markAsUntouched();
           this.signUpForm.get('confirmPassword')?.markAsUntouched();
        }
      });
  }

  // Getters for easy template access
  get fullName() { return this.signUpForm.get('fullName'); }
  get studentCode() { return this.signUpForm.get('studentCode'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
}