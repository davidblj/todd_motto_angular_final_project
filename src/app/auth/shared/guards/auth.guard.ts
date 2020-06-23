import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.currentUser.pipe(
      map(user => !!user),
      tap(userIsLoggedIn => {

        if (!userIsLoggedIn) {
          this.router.navigate(['/auth/login'])
        }
      })
    )
  }
  
}
