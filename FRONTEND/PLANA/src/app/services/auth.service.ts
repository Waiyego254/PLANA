import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDetails, UserRegister } from '../components/interfaces/users'; 
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails } from '../components/interfaces/userdetails';
import { BookingDetails } from '../components/interfaces/bookingdetails';
import { events } from '../components/interfaces/events';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5500/users';
  private baseUrl = 'http://localhost:5500'

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers }).pipe(
      catchError((error) => {
        return new Observable<any>(observer => {
          observer.error(error);
        });
      })
    );
  }

  login(email: string, password: string): Observable<TokenDetails> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TokenDetails>(`${this.apiUrl}/login`, { email, password }, { headers }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role || '');
          localStorage.setItem('userId', response.user_id || '');
          localStorage.setItem('username', response.username || '')
        }
      }),
      catchError((error) => {
        return new Observable<TokenDetails>(observer => {
          observer.error(error);
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  updateUserProfile(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${email}`, { password }, { headers }).pipe(
      map(response => {
        if (response.message) {
          return { success: true, message: response.message };
        } else {
          return { success: false, error: response.error };
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  fetchAllUsers(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{users: UserDetails[]}>(`${this.apiUrl}/fetch-all-users`, { headers })
  }

  fetchUsers(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{ users: UserDetails[] }>(`${this.apiUrl}/fetch-users`, { headers })
      
  }

  activateUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/activate/${userId}`, {}, { headers }).pipe(
      map(response => {
        return { message: response.message };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deactivateUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/deactivate/${userId}`, {}, { headers }).pipe(
      map(response => {
        return { message: response.message };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  switchUserRole(userId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/switch-role`, { user_id: userId }, { headers }).pipe(
      map(response => {
        if (response.message) {
          return { success: true, message: response.message };
        } else {
          return { success: false, error: response.error };
        }
      })
    );
  }

  fetchAllBookings(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{ events: events[] }>(`${this.baseUrl}/bookings/getAllBookings`, { headers })
      
  }

  fetchBookingsByEvent(eventId: string): Observable<{ bookingsByEvent: BookingDetails[] }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{ bookingsByEvent: BookingDetails[] }>(`${this.baseUrl}/bookings/events/${eventId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching bookings for event', error);
          return throwError(error);
        })
      );
  }

  createBooking(user_id: string, event_id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/bookings/createBooking`, { user_id, event_id }, { headers });
  }

  fetchBookingsByUser(userId: string): Observable<{ bookingsByUser: BookingDetails[] }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{ bookingsByUser: BookingDetails[] }>(`${this.baseUrl}/bookings/users/${userId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching bookings for user', error);
          return throwError(error);
        })
      );
  }

  fetchEventDetails(eventId: string): Observable<events> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<events>(`${this.baseUrl}/events/${eventId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching event details', error);
        return throwError(error);
      })
    );
  }

  cancelBooking(bookingId: string): Observable<{ message: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<{ message: string }>(`${this.baseUrl}/bookings/cancelBooking/${bookingId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error canceling booking', error);
          return throwError(error);
        })
      );
  }
  
}
