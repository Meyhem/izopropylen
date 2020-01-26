import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthenticationToken } from '../models/authentication-token';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  register(username: string, displayName: string, password: string) {
    return this.http.post(`${environment.apiUrl}/accounts`, {
      username, displayName, password
    });
  }

  authenticate(username: string, password: string) {
    return this.http.post<{token: string, expires: string}>(`${environment.apiUrl}/accounts/token`, {
      username, password
    });
  }
}
