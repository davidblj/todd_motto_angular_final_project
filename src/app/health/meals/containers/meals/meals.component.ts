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
    this.meals$ = this.store.select<Meal[]>('meals')
    this.subscription = this.mealsService.meals.subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
