import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { events } from '../interfaces/events';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, NavbarComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  events: events[] = [];
  loginMessage: string = ''

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventsService.fetchAllEvents().subscribe((response) => {
      this.events = response.events;
    });
  }

  bookEvent(eventId: string): void {
    this.loginMessage = 'Redirecting to login page'
    setTimeout(() => {
      this.loginMessage = ''
      this.router.navigate(['/login']);
    }, 3000);
  }
}
