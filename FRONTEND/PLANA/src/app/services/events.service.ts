// src/app/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { events } from '../components/interfaces/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = 'http://localhost:5500/events';

  constructor(private http: HttpClient) {}

  fetchAllEvents() {
    return this.http.get<{events:events[]}>(`${this.baseUrl}/viewAllEvents`);
  }

  approveEvent(eventId: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/approve-event/${eventId}`, {});
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${eventId}`);
  }

  createEvent(event: events): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/createEvent`, event, { headers });
  }

  updateEvent(event_id: string, event: events): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/${event_id}`, event, { headers });
  }
  
}
