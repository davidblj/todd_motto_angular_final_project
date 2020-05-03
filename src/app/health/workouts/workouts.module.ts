import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { RouterModule, Routes } from '@angular/router';

var routes: Routes = [
  { path: '', component: WorkoutsComponent}
]

@NgModule({
  declarations: [WorkoutsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkoutsModule { }
