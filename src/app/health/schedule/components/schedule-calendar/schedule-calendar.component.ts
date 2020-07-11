import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {

  selectedDate: Date

  // note that our variable 'selected day' comes from a subscription made to the
  // store in the schedule container component. 
  
  // the chaing of events goes like this: The schedule container sets the behavior subject with a new 
  // date through the schedule service. This subject in turn emits a new value, that our schedule 
  // container is also subscribed to, but only to chain an store data update through the service. 
  // Once the service updates the store, our subscription to the store in the schedule container
  // inmediatly kicks off. 

  // we've got 2 subscriptions, but one is made only to have an active 'listener' that sets the store
  // each time the behaviour subject is changed 

  @Input()
  set date(date: Date) {
    this.selectedDate = new Date(date.getTime())
  }

  @Output()
  change = new EventEmitter<Date>()

  constructor() { }

  ngOnInit(): void {
  }

  changeSelectedDate(weekOffset: number) {          
    var startOfWeek = this.getStartOfWeek()
    var startOfWeekWithOffset = this.getStartWeekWithOffset(startOfWeek, weekOffset)
    this.change.emit(startOfWeekWithOffset)
  }

  getStartOfWeek() : Date {    
    let currentDate = new Date()
    const dayOfWeek = this.getDayOfWeekFrom(currentDate)
    const dayOfMonth = currentDate.getDate()
    const startDayOfWeek = dayOfMonth - dayOfWeek 
    return new Date(currentDate.setDate(startDayOfWeek) )
  }

  getDayOfWeekFrom(currentDate: Date) {
    const dayOfWeek = currentDate.getDay()
    const isSunday = dayOfWeek === 0
    const offset = isSunday ? (7 - 1) : -1
    return dayOfWeek +  offset
  } 
  
  getStartWeekWithOffset(startOfWeek: Date, offset: number) : Date {
    const weekOffset =  offset * 7
    const startWeekWithOffset = startOfWeek.getDate() + weekOffset
    return new Date(startOfWeek.setDate(startWeekWithOffset))
  }

}
