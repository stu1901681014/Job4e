import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, UserBase } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUserById$(userID: number): Observable<User> {
    return this.http.get<User>(`${environment.BASE_URL}/users/${userID}`);
  }

  deleteUser$(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}/users/${userId}`);
  }

  updateProfile$(userID: number, userBase: UserBase): Observable<void> {
    return this.http.patch<void>(`${environment.BASE_URL}/users/${userID}`, userBase);
  }
}
