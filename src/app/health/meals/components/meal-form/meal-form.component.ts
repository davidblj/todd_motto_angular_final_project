import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals.service';

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit, OnChanges {

  toggled = false
  exists = false

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>()

  @Output()
  update = new EventEmitter<Meal>()

  @Output()
  remove = new EventEmitter<Meal>()
  
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(private fb: FormBuilder) { }  

  ngOnInit(): void {    
  }

  // patch the form as soon as a value is received through
  // the input parameter. Do note that you might as well call 
  // this function inside the ngOnInit, but this property is
  // an async property, meaning that when this component is
  // rendered for the first time, our value may or may be 
  // not be resolved
  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true
      this.form.patchValue(this.meal)
      this.setIngredientsManually()
    }
  }  

  // angular quirk to patch values on form arrays
  setIngredientsManually() {

    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0)
    }

    this.meal.ingredients.forEach((ingredient) => { 
      this.ingredients.push(new FormControl(ingredient)) 
    })
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value)
    }
  }

  removeMeal() { 
    this.remove.emit(this.form.value)
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value)
    }
  }

  // dynamic form control
  addIngredient() {
    this.ingredients.push(new FormControl(''))
  } 

  removeIngredients(index: number) {
    this.ingredients.removeAt(index)
  }
  
  toggle() {
    this.toggled = !this.toggled
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
