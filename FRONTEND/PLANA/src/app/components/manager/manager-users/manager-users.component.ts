// src/app/components/manager-users/manager-users.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserDetails } from '../../interfaces/userdetails';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {
  users: UserDetails[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.fetchUsers().subscribe(
      (response) => {
        this.users = response.users;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch users';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}
