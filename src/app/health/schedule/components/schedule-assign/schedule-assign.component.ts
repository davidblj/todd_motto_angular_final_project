import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workout } from 'src/app/health/shared/services/workouts.service';
import { Meal } from 'src/app/health/shared/services/meals.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss']
})
export class ScheduleAssignComponent implements OnInit {

  private selectionList: string[] = []

  @Input()
  selectedItem: any

  @Input()
  selectedList: Meal[] | Workout[]

  @Output()
  update = new EventEmitter<any>()

  @Output()
  cancel = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    this.selectionList = [...this.selectedItem.assignedItems]
  }

  getRoute(name: string) {
    return [`../${name}/new`]
  }    
 
  toggle(item: string) { 
    if (this.itemIsSelected(item)) {
      this.selectionList = this.selectionList.filter(item => item !== item)
    } else {
      this.selectionList = [...this.selectionList, item]
    }
  }

  itemIsSelected(itemName: string) { 
    return this.selectionList.indexOf(itemName) !== -1
  } 

  updateAssign() {
    this.update.emit({
      [this.selectedItem.type]: this.selectionList
    })
  }

  cancelAssign() {
    this.cancel.emit()
  }
}
