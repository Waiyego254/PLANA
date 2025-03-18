import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { TokenDetails } from '../interfaces/users';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

// Mock AuthService
class AuthServiceMock {
  login(email: string, password: string) {
    return of({ message: 'Login successful', role: 'user' } as TokenDetails);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceMock;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule,CommonModule, LoginComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as AuthServiceMock;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display email error message when email is invalid', () => {
    const emailControl = { errors: { required: true } };
    component.errorMessages.email = component.getEmailErrorMessage(emailControl);
    fixture.detectChanges();
    expect(component.errorMessages.email).toBe('Email is required.');
  });

  it('should display password error message when password is invalid', () => {
    const passwordControl = { errors: { required: true } };
    component.errorMessages.password = component.getPasswordErrorMessage(passwordControl);
    fixture.detectChanges();
    expect(component.errorMessages.password).toBe('Password is required.');
  });

  it('should call AuthService.login and navigate on successful login', fakeAsync(() => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(of({ message: 'Login successful', role: 'user' } as TokenDetails));
    const navigateSpy = router.navigate;

    component.user.email = 'test@example.com';
    component.user.password = 'password';

    const form = <NgForm>{ valid: true, invalid: false, controls: {} };
    component.onSubmit(form);

    tick(3000); // Simulate the passage of time for the setTimeout
    expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'password');
    expect(navigateSpy).toHaveBeenCalledWith(['/user-dashboard']);
  }));

  it('should handle login error and display general error message', fakeAsync(() => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(throwError({}));
    const errorMsg = 'Server error. Please try again later.';

    component.user.email = 'test@example.com';
    component.user.password = 'password';

    const form = <NgForm>{ valid: true, invalid: false, controls: {} };
    component.onSubmit(form);

    tick(); // Simulate async passage of time
    expect(component.errorMessages.general).toBe(errorMsg);
  }));

  it('should clear error messages after timeout', fakeAsync(() => {
    component.errorMessages.general = 'Some error';
    component.setErrorTimeout();

    tick(2000); // Simulate the passage of time for the timeout
    expect(component.errorMessages.general).toBe('');
  }));

  it('should navigate to different routes based on user role', () => {
    component.navigateBasedOnRole('admin');
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    
    component.navigateBasedOnRole('manager');
    expect(router.navigate).toHaveBeenCalledWith(['/manager']);
    
    component.navigateBasedOnRole('user');
    expect(router.navigate).toHaveBeenCalledWith(['/user-dashboard']);
  });
});
