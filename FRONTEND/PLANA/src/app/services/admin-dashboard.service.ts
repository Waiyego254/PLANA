// src/app/services/admin-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseUrl = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  getUserCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/user/countUsers`);
  }

  getUserCountRole(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users/user/countUserRole`);
  }

  getEventCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/event/numberOfEvents`);
  }

  getTotalRevenue(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/bookings/book/revenue`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/bookings/getAllBookings`);
  }
}
