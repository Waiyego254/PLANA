// src/app/components/admin-events/admin-events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';
import { events } from '../../interfaces/events';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  events: events[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.fetchAllEvents();
  }

  fetchAllEvents() {
    this.eventsService.fetchAllEvents().subscribe(
      (response) => {
        this.events = response.events;
        console.log('Fetched events:', this.events);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  approveEvent(eventId: string) {
    this.eventsService.approveEvent(eventId).subscribe(
      (response) => {
        console.log(response.message);
        this.fetchAllEvents(); // Refresh the event list
      },
      (error) => {
        console.error('Error approving event:', error);
      }
    );
  }

  deleteEvent(eventId: string) {
    this.eventsService.deleteEvent(eventId).subscribe(
      (response) => {
        console.log(response.message);
        this.fetchAllEvents(); // Refresh the event list
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }
}
