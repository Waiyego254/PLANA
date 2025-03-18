import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AdminUsersComponent } from './admin-users.component';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class AuthServiceMock {
  fetchAllUsers() {
    return of({ users: [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }] });
  }

  deactivateUser(userId: string) {
    return of({ message: 'User deactivated successfully' });
  }

  activateUser(userId: string) {
    return of({ message: 'User activated successfully' });
  }
}

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,RouterTestingModule, HttpClientTestingModule, AdminUsersComponent],
      declarations: [],
      providers: [{ provide: AuthService, useClass: AuthServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all users on init', () => {
    const fetchAllUsersSpy = spyOn(authService, 'fetchAllUsers').and.callThrough();

    component.ngOnInit();

    expect(fetchAllUsersSpy).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.users[0].name).toBe('John Doe');
  });

  it('should handle error when fetching users', () => {
    const fetchAllUsersSpy = spyOn(authService, 'fetchAllUsers').and.returnValue(throwError({}));
    
    component.fetchAllUsers();
    
    expect(fetchAllUsersSpy).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Error fetching users. Please try again later.');
  });

  it('should activate a user and refresh the user list', () => {
    const activateUserSpy = spyOn(authService, 'activateUser').and.callThrough();
    const fetchAllUsersSpy = spyOn(component, 'fetchAllUsers').and.callThrough();

    component.activateUser('1');

    expect(activateUserSpy).toHaveBeenCalledWith('1');
    expect(component.successMessage).toBe('User activated successfully');
    expect(fetchAllUsersSpy).toHaveBeenCalled();
  });

  it('should handle error when activating a user', () => {
    const activateUserSpy = spyOn(authService, 'activateUser').and.returnValue(throwError({}));

    component.activateUser('1');

    expect(activateUserSpy).toHaveBeenCalledWith('1');
    expect(component.errorMessage).toBe('Error activating user. Please try again later.');
  });

  it('should deactivate a user and refresh the user list', () => {
    const deactivateUserSpy = spyOn(authService, 'deactivateUser').and.callThrough();
    const fetchAllUsersSpy = spyOn(component, 'fetchAllUsers').and.callThrough();

    component.deactivateUser('1');

    expect(deactivateUserSpy).toHaveBeenCalledWith('1');
    expect(component.successMessage).toBe('User deactivated successfully');
    expect(fetchAllUsersSpy).toHaveBeenCalled();
  });

  it('should handle error when deactivating a user', () => {
    const deactivateUserSpy = spyOn(authService, 'deactivateUser').and.returnValue(throwError({}));

    component.deactivateUser('1');

    expect(deactivateUserSpy).toHaveBeenCalledWith('1');
    expect(component.errorMessage).toBe('Error deactivating user. Please try again later.');
  });

  it('should clear error messages after timeout', (done) => {
    component.errorMessage = 'Some error';
    component.setErrorTimeout();
    
    setTimeout(() => {
      expect(component.errorMessage).toBe('');
      done();
    }, 3100); // Allow time for the timeout to complete
  });

  it('should clear success messages after timeout', (done) => {
    component.successMessage = 'Some success';
    component.setSuccessTimeout();
    
    setTimeout(() => {
      expect(component.successMessage).toBe('');
      done();
    }, 3100); // Allow time for the timeout to complete
  });
});
