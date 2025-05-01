import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';  // ← ضيف ده
import { AppComponent } from './app.component';
// لو Navbar استخدمته:
import { NavbarComponent } from './shared/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,      // ← لازم هنا
        NavbarComponent           // ← لو ظاهر جوه template
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app     = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // باقي الاختبارات...
});
