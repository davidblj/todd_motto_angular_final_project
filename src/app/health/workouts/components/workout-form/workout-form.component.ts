import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workout } from 'src/app/health/shared/services/workouts.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {

  toggled = false
  exists = false

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>()

  @Output()
  update = new EventEmitter<Workout>()

  @Output()
  remove = new EventEmitter<Workout>()
  
  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength'
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value)
    }
  }

  removeWorkout() { 
    this.remove.emit(this.form.value)
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value)
    }
  }

  toggle() {
    this.toggled = !this.toggled
  }

  get name() {
    return this.form.get('name')
  }

  get required() {
    return this.name.hasError('required') &&
           this.name.touched
  }

}
