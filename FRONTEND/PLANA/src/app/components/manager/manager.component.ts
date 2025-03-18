import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ManagerSidebarComponent } from './manager-sidebar/manager-sidebar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, ManagerSidebarComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  isActive: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }
}
