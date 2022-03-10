import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User, UserBase } from '../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthFacade } from '../../../auth/services/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  private updateProfileLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private usersService: UsersService,
    private authFacade: AuthFacade
  ) {
  }

  getUserById$(userID: number): Observable<User> {
    return this.usersService.getUserById$(userID);
  }

  deleteUser$(userID: number): Observable<void> {
    return this.usersService.deleteUser$(userID);
  }

  getUpdateProfileLoading$(): Observable<boolean> {
    return this.updateProfileLoading$.asObservable();
  }

  updateProfile$(userID: number, userBase: UserBase): Observable<void> {
    this.updateProfileLoading$.next(true);

    return this.usersService.updateProfile$(userID, userBase)
      .pipe(
        tap(() => this.authFacade.saveUserToStorage(userBase)),
        finalize(() => this.updateProfileLoading$.next(false))
      );
  }
}
