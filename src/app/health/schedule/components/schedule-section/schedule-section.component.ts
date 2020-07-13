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

  // we are going to emit a value with an empty assigned item, if none
  // is selected, or we an assigned item, if its already created 
  onItemSelect(type: string, assignedItems: Meal[] | Workout[]  = []) {
    
    const data = this.section
    this.select.emit({
      type, 
      assignedItems, 
      data
    })
  }

}
