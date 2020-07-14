import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/store';
import { ScheduleService, ScheduleItem } from 'src/app/health/shared/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>
  schedule$: Observable<ScheduleItem>
  subscriptions : Subscription[]

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) { }  

  ngOnInit(): void {

    // remember this is a behavior subject, a soon as we subscribe to it
    // in the schedule service, the variable date$ and $schedule are going to resolve 
    // into some value
    this.date$ = this.store.select('date')
    this.schedule$ = this.store.select('schedule')


    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),      
      this.scheduleService.selected$.subscribe(),
    ] 
  }

  changeDate(newDate: Date) {
    this.scheduleService.update(newDate)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  } 

  onItemSelect(selectionObject: any) {
    this.scheduleService.updateItem(selectionObject)
  }
}
