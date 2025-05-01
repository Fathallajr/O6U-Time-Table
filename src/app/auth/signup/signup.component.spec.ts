import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule }       from '@angular/forms';
import { RouterTestingModule }      from '@angular/router/testing';

import { SignUpComponent } from './signup.component'; 

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
