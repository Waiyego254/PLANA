import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { events } from '../interfaces/events';
import { CommonModule } from '@angular/common';
import { UserBookingsComponent } from '../user-bookings/user-bookings.component';
import { TokenDetails } from '../interfaces/users';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, UserBookingsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  events: events[] = [];
  bookingMessage: string = '';
  bookingError: string = '';
  username: string = '';

  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchEvents();
    this.loadUserData();
  }

  fetchEvents() {
    this.eventsService.fetchAllEvents().subscribe(response => {
      this.events = response.events;
    });
  }

  loadUserData() {
    this.username = localStorage.getItem('username') || '';
  }

  bookEvent(eventId: string) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.createBooking(userId, eventId).subscribe(
        response => {
          if (response.message === 'Booking created successfully') {
            this.bookingMessage = response.message;
            setTimeout(() => {
              this.bookingMessage = '';
              this.router.navigate(['/user-bookings']);
            }, 3000);
          }
        },
        error => {
          if (error.error === 'Booking already exists') {
            this.bookingError = 'You have already booked this event.';
          } else if (error.error === 'Event is fully booked') {
            this.bookingError = 'Sorry, this event is fully booked.';
          } else {
            console.error('Error creating booking', error);
            this.bookingError = 'Booking already exists';
          }
          setTimeout(() => {
            this.bookingError = '';
          }, 3000);
        }
      );
    } else {
      alert('User not logged in');
    }
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
