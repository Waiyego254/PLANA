import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, AdminSidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isActive: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }
}
