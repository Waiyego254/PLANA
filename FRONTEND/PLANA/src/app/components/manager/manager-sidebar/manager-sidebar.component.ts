import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-manager-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './manager-sidebar.component.html',
  styleUrl: './manager-sidebar.component.css'
})
export class ManagerSidebarComponent {
  isActive: boolean = false;

  constructor(private sidebarService: SidebarService, private router: Router) {
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
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
