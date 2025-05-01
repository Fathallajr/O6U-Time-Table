// src/app/auth/login/login.component.ts
import { Component, OnInit }             from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                        from '@angular/router';
import { AuthService, User }             from '../../services/auth.service'; // استيراد الــ AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,  // حقن الــ AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
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

    // هنا مكان مناداة الـ API للـ login، وبعد الاستجابة الناجحة:
    // مثال تجريبي على setUser مع بيانات ثابتة
    const demoUser: User = {
      name: 'Mahmoud Fathallah',
      photoUrl: 'https://i.pravatar.cc/150?img=3'
    };
    this.auth.setUser(demoUser);

    // بعد كده نعمل توجيه للشاشة الرئيسية (مثلاً dashboard)
    this.router.navigate(['/dashboard']);
  }

  // getters للتمبليت
  get email()    { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
