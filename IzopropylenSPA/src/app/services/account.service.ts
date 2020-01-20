import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.http.post<AuthenticationResponse>(`${environment.apiUrl}/accounts/token`, {
      username, password
    });
  }
}
