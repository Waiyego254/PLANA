// src/app/components/manager-dashboard/manager-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  standalone: true,
  imports: [ChartModule]
})
export class ManagerDashboardComponent implements OnInit {
  userCount: number = 0;
  eventCount: number = 0;
  bookingCount: number = 0;

  userChartData: any;
  eventChartData: any;
  bookingChartData: any;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.adminDashboardService.getUserCount().subscribe(
      response => {
        this.userCount = response.numberOfUsers;
        this.userChartData = {
          labels: ['Users'],
          datasets: [
            {
              data: [this.userCount],
              backgroundColor: ['#42A5F5'],
              hoverBackgroundColor: ['#64B5F6']
            }
          ]
        };
      },
      error => {
        console.error('Error fetching user count', error);
      }
    );

    this.adminDashboardService.getEventCount().subscribe(
      response => {
        this.eventCount = response.numberOfEvents;
        this.eventChartData = {
          labels: ['Events'],
          datasets: [
            {
              label: 'Events',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [this.eventCount]
            }
          ]
        };
      },
      error => {
        console.error('Error fetching event count', error);
      }
    );

    this.adminDashboardService.getAllBookings().subscribe(
      response => {
        this.bookingCount = response.events.length;
        this.bookingChartData = {
          labels: ['Bookings'],
          datasets: [
            {
              label: 'Bookings',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [this.bookingCount]
            }
          ]
        };
      },
      error => {
        console.error('Error fetching booking count', error);
      }
    );
  }
}
