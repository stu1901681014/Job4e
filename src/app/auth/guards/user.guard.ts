import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '../services/auth.facade';
import { UserTypeEnum } from '../../shared/enums/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {
  constructor(private router: Router, private auth: AuthFacade) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userType = this.auth.getUserType();

    if (userType === UserTypeEnum.USER) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
