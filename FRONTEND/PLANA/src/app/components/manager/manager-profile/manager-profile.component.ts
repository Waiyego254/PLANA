import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.updateUserProfile(email, password).subscribe(
        (response) => {
          if (response.success) {
            this.successMessage = response.message;
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            this.errorMessage = response.error;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        },
        (error) => {
          this.successMessage = '';
          this.errorMessage = error.error.error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    }
  }
  }

