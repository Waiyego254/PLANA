// src/app/services/admin-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  private apiUrl = 'http://localhost:5500/users';

  constructor(private http: HttpClient) {}

  updateProfile(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/${email}`;
    const body = { password: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers: headers });
  }
}
