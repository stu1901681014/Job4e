import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUsersByUsername$(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.BASE_URL}/users?username=${username}`);
  }
}
