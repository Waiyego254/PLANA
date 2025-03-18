import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { TokenDetails } from '../interfaces/users';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  
  user = {
    email: '',
    password: ''
  };

  errorMessages = {
    email: '',
    password: '',
    general: ''
  };

  loginSuccess: boolean = false;
  successMessage = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessages.email = this.getEmailErrorMessage(form.controls['email']);
      this.errorMessages.password = this.getPasswordErrorMessage(form.controls['password']);
      this.setErrorTimeout();
      return;
    }

    this.authService.login(this.user.email, this.user.password).subscribe(
      (response: TokenDetails) => {
        if (response.message === 'Login successful') {
          this.loginSuccess = true;
          this.successMessage = response.message;
          setTimeout(() => {
            this.navigateBasedOnRole(response.role || 'user');
          }, 3000);
        } else {
          this.errorMessages.general = response.message || 'Login failed. Please try again.';
          this.setErrorTimeout();
        }
      },
      (error) => {
        this.errorMessages.general = 'Server error. Please try again later.';
        this.setErrorTimeout();
      }
    );
  }

  getEmailErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'Email is required.';
    }
    if (control.errors?.email) {
      return 'Invalid email address.';
    }
    return '';
  }

  getPasswordErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'Password is required.';
    }
    return '';
  }

  navigateBasedOnRole(role: string) {
    switch (role) {
      case 'manager':
        this.router.navigate(['/manager/manager-home']);
        break;
      case 'admin':
        this.router.navigate(['/admin/admin-home']);
        break;
      case 'user':
      default:
        this.router.navigate(['/user-dashboard']);
        break;
    }
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.errorMessages.email = '';
      this.errorMessages.password = '';
      this.errorMessages.general = '';
    }, 2000);
  }
}
