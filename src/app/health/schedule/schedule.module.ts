import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';

var routes: Routes = [
  { path: '', component: ScheduleComponent}
]

@NgModule({
  declarations: [ScheduleComponent, ScheduleCalendarComponent, ScheduleControlsComponent, ScheduleDaysComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
