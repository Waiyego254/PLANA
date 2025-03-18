import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  isActive: boolean = false;

  constructor(private sidebarService: SidebarService, private authService: AuthService, private router: Router) {
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    // this.localstorageService.removeItem('user_id');
    // this.localstorageService.removeItem('token');
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
