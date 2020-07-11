import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent implements OnInit {

  offset = 0

  @Input()
  selected: Date

  @Output()
  move = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  moveDateBasedOn(offset : number) { 
    this.offset = offset
    this.move.emit(this.offset)
  }

}
