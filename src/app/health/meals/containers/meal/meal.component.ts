import { Component, OnInit } from '@angular/core';
import { Meal, MealsService } from 'src/app/health/shared/services/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  meal$: Observable<Meal>
  // subscription: Subscription

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    
  ngOnInit(): void {

    /*
      A subscription is made to all the user meals, as it might
      be the case that he opened the app on the item description page and not the landing page.
      So as soon as he heads back, the store is already set with the user values (?!?!?)
      
      Now, the reason he does this, is because the service wont consume an API, but the
      store itself.      

      // this.subscription = this.mealsService.meals.subscribe()
    */       
    
    this.meal$ = this.activatedRoute.params.pipe(
      switchMap((param) => this.mealsService.getMealBy(param.id))
    )    
  }

  addMeal(meal : Meal) {

    this.mealsService.add(meal).pipe(
      tap(this.backToMeals.bind(this))
    ).subscribe()
  }

  backToMeals(next) {
    this.router.navigate(['meals'])
  }
}
