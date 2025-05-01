// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';

import { AppComponent }         from './app/app.component';
import { LoginComponent }       from './app/auth/login/login.component';
import { SignUpComponent }      from './app/auth/signup/signup.component';
import { LevelSelectComponent } from './app/level-select/level-select.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '',       redirectTo: 'login', pathMatch: 'full' },
      { path: 'login',  component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'level',  component: LevelSelectComponent, pathMatch: 'full' },
      { path: '**',     redirectTo: 'login', pathMatch: 'full' }
    ])
  ]
})
.catch(err => console.error(err));
