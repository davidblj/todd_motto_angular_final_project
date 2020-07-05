import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/health/shared/services/meals.service';
import { Store } from 'src/app/store';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  subscription: Subscription  

  constructor(
  private workoutsService: WorkoutsService,
    private store: Store) { }

  ngOnInit(): void {
    this.workouts$ = this.store.select<Workout[]>('workouts')
    this.subscription = this.workoutsService.workouts.subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  remove(workout: Workout) {
    this.workoutsService.remove(workout).subscribe()
  }
}
