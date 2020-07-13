import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { SharedModule } from '../shared/shared.module';

var routes: Routes = [
  { path: '', component: ScheduleComponent}
]

@NgModule({
  declarations: [ScheduleComponent, ScheduleCalendarComponent, ScheduleControlsComponent, ScheduleDaysComponent, ScheduleSectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ScheduleModule { }
