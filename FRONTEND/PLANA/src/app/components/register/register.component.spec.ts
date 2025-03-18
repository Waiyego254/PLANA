import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserRegister } from '../interfaces/users';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

// Mock AuthService
class AuthServiceMock {
  register(user: UserRegister) {
    return of({ message: 'Registration successful' });
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, RegisterComponent,RouterTestingModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register and navigate on successful registration', () => {
    const registerSpy = spyOn(authService, 'register').and.returnValue(of({ message: 'Registration successful' }));
    const navigateSpy = spyOn(router, 'navigate');

    const form = fixture.debugElement.nativeElement.querySelector('form');
    component.user.username = 'testuser';
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    component.onSubmit(form as NgForm);

    expect(registerSpy).toHaveBeenCalledWith(component.user);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration error and display general error message', () => {
    const registerSpy = spyOn(authService, 'register').and.returnValue(throwError({}));
    const errorMsg = 'Registration failed. Please try again.';

    const form = fixture.debugElement.nativeElement.querySelector('form');
    component.user.username = 'testuser';
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    component.onSubmit(form as NgForm);

    fixture.detectChanges();
    expect(component.error).toBe(errorMsg);
  });

  it('should clear error messages after timeout', (done) => {
    component.error = 'Some error';
    component.setErrorTimeout();
    
    setTimeout(() => {
      expect(component.error).toBe('');
      done();
    }, 3000); // Allow time for the timeout to complete
  });
});
