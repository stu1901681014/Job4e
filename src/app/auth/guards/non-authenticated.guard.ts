import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '../services/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanLoad {
  constructor(private router: Router, private auth: AuthFacade) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username = this.auth.getUsernameFromStorage();

    if (username) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
