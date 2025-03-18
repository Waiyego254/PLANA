import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['updateUserProfile']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, FormsModule, CommonModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error messages if form is invalid', () => {
    const form = { invalid: true } as NgForm;
    component.onSubmit(form);

    expect(component.showErrorMessages).toBeTrue();
  });

  it('should call authService.updateUserProfile with correct values when form is valid', () => {
    const form = { invalid: false, value: { email: 'test@example.com', password: 'password' } } as NgForm;
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    authService.updateUserProfile.and.returnValue(of({ success: true, message: 'Profile updated successfully' }));

    component.onSubmit(form);

    expect(authService.updateUserProfile).toHaveBeenCalledWith('test@example.com', 'password');
    expect(component.updateSuccess).toBeTrue();
    expect(component.successMessage).toBe('Profile updated successfully');
  });

  it('should navigate to login after successful profile update', (done) => {
    const form = { invalid: false, value: { email: 'test@example.com', password: 'password' } } as NgForm;
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    authService.updateUserProfile.and.returnValue(of({ success: true, message: 'Profile updated successfully' }));

    component.onSubmit(form);

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    }, 3000);
  });

  it('should show error message if profile update fails', () => {
    const form = { invalid: false, value: { email: 'test@example.com', password: 'password' } } as NgForm;
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    authService.updateUserProfile.and.returnValue(of({ success: false, error: 'Update failed' }));

    component.onSubmit(form);

    expect(component.error).toBe('Update failed');
  });

  it('should handle server error during profile update', () => {
    const form = { invalid: false, value: { email: 'test@example.com', password: 'password' } } as NgForm;
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    authService.updateUserProfile.and.returnValue(throwError({ error: 'Server error' }));

    component.onSubmit(form);

    expect(component.error).toBe('Server error. Please try again later.');
  });

  it('should reset error message after timeout', (done) => {
    component.showErrorMessages = true;
    component.error = 'Some error';

    component.setErrorTimeout();

    setTimeout(() => {
      expect(component.showErrorMessages).toBeFalse();
      expect(component.error).toBe('');
      done();
    }, 3000);
  });
});
