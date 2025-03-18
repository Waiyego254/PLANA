import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AdminProfileComponent } from './admin-profile.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Mock AuthService
class AuthServiceMock {
  updateUserProfile(email: string, password: string) {
    return of({ success: true, message: 'Profile updated successfully' });
  }
}

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, AdminProfileComponent],
      declarations: [],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message and navigate on successful profile update', () => {
    const form = {
      valid: true,
      value: { email: 'test@example.com', password: 'password' }
    } as NgForm;
    spyOn(authService, 'updateUserProfile').and.returnValue(of({ success: true, message: 'Profile updated successfully' }));
    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit(form);

    expect(component.successMessage).toBe('Profile updated successfully');
    expect(component.errorMessage).toBe('');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should display error message on failed profile update', () => {
    const form = {
      valid: true,
      value: { email: 'test@example.com', password: 'password' }
    } as NgForm;
    spyOn(authService, 'updateUserProfile').and.returnValue(of({ success: false, error: 'Profile update failed' }));

    component.onSubmit(form);

    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('Profile update failed');
  });

  it('should handle error from authService', () => {
    const form = {
      valid: true,
      value: { email: 'test@example.com', password: 'password' }
    } as NgForm;
    spyOn(authService, 'updateUserProfile').and.returnValue(throwError({ error: { error: 'Service error' } }));

    component.onSubmit(form);

    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('Service error');
  });

  it('should clear error message after timeout', (done) => {
    component.errorMessage = 'Some error';
    component.onSubmit({ valid: false } as NgForm); // Trigger the error timeout

    setTimeout(() => {
      expect(component.errorMessage).toBe('');
      done();
    }, 3100); // Allow time for the timeout to complete
  });

  it('should not submit the form if it is invalid', () => {
    const form = {
      valid: false,
      value: { email: '', password: '' }
    } as NgForm;

    component.onSubmit(form);

    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('');
  });
});
