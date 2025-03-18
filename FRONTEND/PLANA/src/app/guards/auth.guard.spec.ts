import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

// Mock AuthService
class AuthServiceMock {
  isAuthenticated() {
    return true;
  }
}

// Mock Router
class RouterMock {
  navigate(path: string[], extras?: any) {}
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthServiceMock;
  let router: RouterMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as unknown as AuthServiceMock;
    router = TestBed.inject(Router) as unknown as RouterMock;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    spyOn(router, 'navigate');

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { replaceUrl: true });
  });
});
