import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users: any[] = []; 
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.authService.fetchAllUsers().subscribe(
      (response) => {
        this.users = response.users 
      },
      (error) => {
        this.errorMessage = 'Error fetching users. Please try again later.';
        this.setErrorTimeout();
        console.log('users to be displayed', this.users);
        
      }
    );
  }

  deactivateUser(userId: string) {
    this.authService.deactivateUser(userId).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.fetchAllUsers(); // Refresh the user list
        this.setSuccessTimeout();
      },
      (error) => {
        this.errorMessage = 'Error deactivating user. Please try again later.';
        this.setErrorTimeout();
      }
    );
  }

  activateUser(userId: string) {
    this.authService.activateUser(userId).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.fetchAllUsers(); // Refresh the user list
        this.setSuccessTimeout();
      },
      (error) => {
        this.errorMessage = 'Error activating user. Please try again later.';
        this.setErrorTimeout();
      }
    );
  }

  switchUserRole(userId: string) {
    this.authService.switchUserRole(userId).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = response.message;
          this.fetchAllUsers(); // Refresh the user list
        } else {
          this.errorMessage = response.error;
          this.setErrorTimeout();
        }
        this.setSuccessTimeout();
      },
      (error) => {
        this.errorMessage = 'Error switching user role. Please try again later.';
        this.setErrorTimeout();
      }
    );
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  setSuccessTimeout() {
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
