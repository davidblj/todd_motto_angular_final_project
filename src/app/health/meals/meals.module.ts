import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './containers/meals/meals.component';
import { Routes, RouterModule } from '@angular/router';

var routes: Routes = [
  { path: '', component: MealsComponent}
]

@NgModule({
  declarations: [MealsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MealsModule { }
