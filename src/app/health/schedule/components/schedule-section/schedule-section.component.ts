import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleItem } from 'src/app/health/shared/services/schedule.service';
import { Workout } from 'src/app/health/shared/services/workouts.service';
import { Meal } from 'src/app/health/shared/services/meals.service';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnInit {

  @Input()
  name: string

  @Input()
  section: ScheduleItem

  @Output()
  select = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  // we are going to emit a value with an empty or non empty assigned item.
  // it consists on, the ScheduleItem, the list of meals or workouts (depending
  // on where the user clicked) and the type of that list (a 'meal' or a 'workout')
    
  onItemSelect(type: string, assignedItems: Meal[] | Workout[]  = []) {
    
    const data = this.section
    this.select.emit({
      type, 
      assignedItems, 
      data
    })
  }
}
