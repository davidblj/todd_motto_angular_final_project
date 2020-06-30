import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal, MealsService } from 'src/app/health/shared/services/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }  
    
  ngOnInit(): void {

    /*
      A subscription is made to all the user meals, as it might
      be the case that he opened the app on the item description page and not the landing page.
      So as soon as he heads back, the store is already set with the user values (?!?!?)
      
      Now, the reason for this, is because the service wont consume an API, but the
      store itself for an specific item (which is in my honest opinion, is not necessary).      

      // this.subscription = this.mealsService.meals.subscribe()
    */       
    
    this.meal$ = this.activatedRoute.params.pipe(
      switchMap((param) => this.mealsService.getMealBy(param.id))
    )    
  }

  add(meal: Meal) {

    this.mealsService.add(meal).pipe(
      tap(this.backToMeals.bind(this))
    ).subscribe()
  }
  
  update(meal: Meal) { 

    // this is the equivalent but static way of doing things of 
    // an activated route parameters we used in ngOnInit  
    var id = this.activatedRoute.snapshot.params.id

    this.mealsService.updateMealById(meal, id).pipe(
      tap(this.backToMeals.bind(this))
    ).subscribe()    
  }

  remove(meal: Meal) {

    this.mealsService.remove(meal).pipe(
      tap(this.backToMeals.bind(this))
    ).subscribe()        
  }

  backToMeals() {
    this.router.navigate(['meals'])
  }

  ngOnDestroy(): void {
    // todo: destroy every subscription 
  }
}
