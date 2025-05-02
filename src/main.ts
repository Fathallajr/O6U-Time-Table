// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/auth/login/login.component';
import { SignUpComponent } from './app/auth/signup/signup.component';
import { LevelSelectComponent } from './app/level-select/level-select.component';
import { ScheduleDisplayComponent } from './app/schedule/schedule-display/schedule-display.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'level', component: LevelSelectComponent },
      { path: 'schedule', component: ScheduleDisplayComponent }, 
      { path: '**', redirectTo: 'login' }
    ])
  ]
})
.catch(err => console.error(err));