import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent implements OnInit {

  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  @Input()
  selectedDay: number

  @Output()
  select = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  selectDay(index: number) {
    this.select.emit(index)
  }
}
