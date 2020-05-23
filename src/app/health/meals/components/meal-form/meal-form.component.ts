import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals.service';

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  @Output()
  create = new EventEmitter<Meal>()
  
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {    
  }

  createMeal() {

    if (this.form.valid) {
      this.create.emit(this.form.value)
    }
  }

  // dynamic form control
  addIngredient() {
    this.ingredients.push(new FormControl(''))
  } 

  removeIngredients(index: number) {
    this.ingredients.removeAt(index)
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray
  }

  get name() {
    return this.form.get('name')
  }

  get required() {
    return this.name.hasError('required') &&
           this.name.touched
  }
}
