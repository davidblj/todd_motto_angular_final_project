import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsService, Meal } from 'src/app/health/shared/services/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription

  constructor(
    private mealsService: MealsService,
    private store: Store) { }

  ngOnInit(): void {

    /* 
      Take a look at how for the first time the application is
      loaded, the meals array is empty and fetching. Navigate away
      and return into the meals component, and that loading is gone as you 
      are obtaining the fetched results from the store first. 
    */
    this.meals$ = this.store.select<Meal[]>('meals')
    this.subscription = this.mealsService.meals.subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
