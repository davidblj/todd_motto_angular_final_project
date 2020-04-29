import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User, AuthService } from './auth/shared/services/auth.service';
import { Store } from './store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  user$ : Observable<User>
  subscription : Subscription

  constructor(
    private store: Store, 
    private authService: AuthService,
    private router: Router) {} 

  ngOnInit(): void {

    // start store data flow
    this.subscription = this.authService.auth$.subscribe();  

    // data subscription
    this.user$ = this.store.select<User>('user'); 
  }

  ngOnDestroy(): void {
    
    // the app component is never destroyed. Nevertheless, is a good practice to have
    // them here
    this.subscription.unsubscribe()
  }

  async onLogout() {
    await this.authService.logOutUser();
    this.router.navigate(['/auth/login']);
  }
}
