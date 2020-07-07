import { Component, OnInit, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting:forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  selectors = ['strength', 'endurance']
  value: string

  private onModelChange = (type: string) => {}
  private onTouched = () => {}  

  constructor() { }

  ngOnInit(): void {
  }

  // set the value into the form, and set a touched state into the
  // the form control 
  writeValue(option: string): void {    
    this.value = option
    this.onModelChange(option)
    this.onTouched()
  }
  
  registerOnChange(fn: (type: string) => void): void {
    this.onModelChange = fn
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  setSelected(option: string) {     
    this.writeValue(option)
  } 
}
