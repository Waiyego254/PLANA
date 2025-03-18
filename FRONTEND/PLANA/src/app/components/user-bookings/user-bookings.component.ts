import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookingDetails } from '../interfaces/bookingdetails';
import { events } from '../interfaces/events';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: BookingDetails[] = [];
  events: events[] = [];
  cancelBook: string = ''

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.fetchBookingsByUser(userId).subscribe(
        (response) => {
          this.bookings = response.bookingsByUser;
          this.bookings.forEach(booking => {
            this.authService.fetchEventDetails(booking.event_id).subscribe(
              (event: events) => {
                this.events.push(event);
              },
              (error) => {
                console.error('Error fetching event details', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error fetching bookings', error);
        }
      );
    }
  }

  cancelBooking(bookingId: string) {
    this.authService.cancelBooking(bookingId).subscribe(
      (response) => {
        this.cancelBook = response.message;
        setTimeout(() => {
          this.cancelBook = '';
        }, 3000);
        console.log(response.message);
        this.loadBookings(); // Reload bookings after cancelation
      },
      (error) => {
        console.error('Error canceling booking', error);
      }
    );
  }

}
