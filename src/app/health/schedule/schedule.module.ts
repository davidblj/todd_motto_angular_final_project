import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { Routes, RouterModule } from '@angular/router';

var routes: Routes = [
  { path: '', component: ScheduleComponent}
]

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
