import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, UserBase } from '../../shared/models/user.model';
import { finalize, switchMap } from 'rxjs/operators';
import { UserTypeEnum } from '../../shared/enums/user-type.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  private loginLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {
  }

  getLoginLoading$(): Observable<boolean> {
    return this.loginLoading$.asObservable();
  }

  login$(username: string, password: string): Observable<User> {
    this.loginLoading$.next(true);

    return this.authService.getUsersByUsername$(username)
      .pipe(
        switchMap((users: User[]) => {
          if (!users.length) {
            return throwError({
              message: 'User not found'
            });
          }

          // no duplicate usernames, response is always array of 1 element
          const user = users[0];

          if (user.password !== password) {
            return throwError({
              message: 'Password is invalid'
            });
          }

          delete user.password;

          this.saveUserToStorage(user);

          return of(user);
        }),
        finalize(() => this.loginLoading$.next(false))
      );
  }

  logout$(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  getUsernameFromStorage(): string {
    return localStorage.getItem('username');
  }

  getUserType(): UserTypeEnum {
    return localStorage.getItem('type') as UserTypeEnum;
  }

  getUserID(): number {
    return Number(localStorage.getItem('id'));
  }

  getUserBaseDataFromStorage(): UserBase {
    return {
      username: this.getUsernameFromStorage(),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email')
    };
  }

  saveUserToStorage(user: User | UserBase): void {
    Object.keys(user).forEach(key => localStorage.setItem(key, user[key]));
  }

}
