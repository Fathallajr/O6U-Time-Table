// src/app/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// لو عندك AuthService ابعته هنا
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log('credentials:', email, password);
    // هنا تبعت للدالة اللي هتتعامل مع الـ API
    // this.auth.login(email, password).subscribe(
    //   () => this.router.navigate(['/dashboard']),
    //   err => console.error(err)
    // );
  }

  // getters for template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
