import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  user = {
    username: '',
    email: '',
    password: ''
  };
  
  userId: string = ''; // Store userId from local storage
  showErrorMessages: boolean = false;
  updateSuccess: boolean = false;
  error = '';
  successMessage = '';
  accountStatus = ''; // Display active/inactive status

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || ''; // Retrieve user ID from local storage
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.http.get(`http://localhost:5500/users/${this.userId}`).subscribe(
      (response: any) => {
        const userData = response.user;
        this.user.username = userData.username;
        this.user.email = userData.email;
        this.accountStatus = userData.isActive ? 'Active' : 'Inactive';
      },
      (error) => {
        this.error = 'Failed to load user data.';
        this.setErrorTimeout();
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showErrorMessages = true;
      this.setErrorTimeout();
      return;
    }

    // Using the updated method to send only email and password in the request
    this.authService.updateUserProfile(this.user.email, this.user.password).subscribe(
      (response) => {
        if (response.success) {
          this.updateSuccess = true;
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.error = response.error;
          this.setErrorTimeout();
        }
      },
      (error) => {
        this.error = 'Server error. Please try again later.';
        this.setErrorTimeout();
      }
    );
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.showErrorMessages = false;
      this.error = '';
    }, 3000);
  }
}