// src/app/components/manager-bookings/manager-bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { BookingDetails } from '../../interfaces/bookingdetails';
import { CommonModule } from '@angular/common';
import { events } from '../../interfaces/events';
@Component({
  selector: 'app-manager-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-bookings.component.html',
  styleUrls: ['./manager-bookings.component.css']
})
export class ManagerBookingsComponent implements OnInit {
  bookings: events[] = [];
  selectedEventId: string | null = null;
  eventBookings: BookingDetails[] = [];
  showModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.authService.fetchAllBookings().subscribe(
      response => {
        console.log("result from backend:", response);
        
        this.bookings = response.events;
      },
      error => {
        console.error('Error loading bookings', error);
      }
    );
  }

  viewBookings(eventId: string): void {
    const event = this.bookings.find(event => event.event_id === eventId);
    if (event && event.bookings.length > 0) {
      this.eventBookings = event.bookings; // Access the bookings for the selected event
      console.log('Bookings for event:', this.eventBookings);
      
      this.showModal = true;
    } else {
      alert('No bookings found for this event');
      this.eventBookings = [];
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
