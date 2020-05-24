import { Component, OnInit } from '@angular/core';
import { Meal, MealsService } from 'src/app/health/shared/services/meals.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  constructor(
    private mealsService: MealsService,
    private router: Router) { }

  ngOnInit(): void {
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
