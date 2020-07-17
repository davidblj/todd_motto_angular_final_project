import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/store';
import { ScheduleService, ScheduleItem } from 'src/app/health/shared/services/schedule.service';
import { MealsService, Meal } from 'src/app/health/shared/services/meals.service';
import { WorkoutsService, Workout } from 'src/app/health/shared/services/workouts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>
  schedule$: Observable<ScheduleItem>
  selectedItem$: Observable<any>
  selectedList$: Observable<Meal[] | Workout[]>
  open = false

  subscriptions : Subscription[]

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) { }  

  ngOnInit(): void {

    // remember this is a behavior subject, a soon as we subscribe to it
    // in the schedule service, the variable date$ and $schedule, and so on ... 
    // are going to resolve eventually into some value
    this.date$ = this.store.select('date')
    this.schedule$ = this.store.select('schedule')
    this.selectedItem$ = this.store.select('selectedItem')
    this.selectedList$ = this.store.select('selectedList')

    // we are fetching the meals and workouts, because our store might not 
    // be populated at this point, and we need them for the section component
    // chain of events and the list$ stream
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),      
      this.scheduleService.selectedItem$.subscribe(),
      this.scheduleService.selectedList$.subscribe(),      
      this.mealsService.meals.subscribe(),
      this.workoutsService.workouts.subscribe()
    ] 
  }

  changeDate(newDate: Date) {
    this.scheduleService.update(newDate)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  } 

  onItemSelect(selectionObject: any) {
    this.open = true
    this.scheduleService.updateItem(selectionObject)
  }

}
