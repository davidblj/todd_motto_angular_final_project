import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './containers/meals/meals.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './containers/meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { ReactiveFormsModule } from '@angular/forms';

var routes: Routes = [
  { path: '', component: MealsComponent},
  { path: 'new', component: MealComponent},
  { path: ':id', component: MealComponent}
]

@NgModule({
  declarations: [MealsComponent, MealComponent, MealFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MealsModule { }
