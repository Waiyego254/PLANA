import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjust the path as necessary
import { UserRegister } from '../interfaces/users'; // Adjust the path as necessary

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}

  user: UserRegister = {
    username: '',
    email: '',
    password: ''
  };

  showErrorMessages: boolean = true;
  registerSuccess: boolean = false;
  error = '';
  successMessage = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.register(this.user).subscribe(
        (response) => {
          if (response.error) {
            this.error = response.error;
            this.setErrorTimeout();
          } else {
            this.registerSuccess = true;
            this.successMessage = response.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        },
        (error) => {
          this.error = 'Registration failed. Please try again.';
          this.setErrorTimeout();
        }
      );
    }

    if (form.invalid) {
      this.setErrorTimeout();
    }
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.showErrorMessages = false;
      this.error = '';
    }, 3000);
  }
}
