import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  workout$: Observable<Workout>
  
  constructor(
    private workoutService: WorkoutsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.workout$ = this.activatedRoute.params.pipe(
      switchMap((param) => this.workoutService.getWorkoutBy(param.id))
    ) 
  }

  add(workout: Workout) {

    this.workoutService.add(workout).pipe(
      tap(this.backToWorkouts.bind(this))
    ).subscribe()
  }
  
  update(workout: Workout) { 

    var id = this.activatedRoute.snapshot.params.id
    this.workoutService.updateWorkoutById(workout, id).pipe(
      tap(this.backToWorkouts.bind(this))
    ).subscribe()    
  }

  remove(workout: Workout) {

    this.workoutService.remove(workout).pipe(
      tap(this.backToWorkouts.bind(this))
    ).subscribe()        
  }

  backToWorkouts() {
    this.router.navigate(['workouts'])
  }
}
