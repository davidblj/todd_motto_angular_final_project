import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutComponent } from './containers/workout/workout.component';
import { SharedModule } from '../shared/shared.module';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

var routes: Routes = [
  { path: '', component: WorkoutsComponent},
  { path: 'new', component: WorkoutComponent},
  { path: ':id', component: WorkoutComponent}
]

@NgModule({
  declarations: [WorkoutsComponent, WorkoutFormComponent, WorkoutComponent, WorkoutTypeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WorkoutsModule { }
