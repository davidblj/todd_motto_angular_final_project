import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ScheduleList } from 'src/app/health/shared/services/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  selectedDate: Date
  selectedDay: number
  selectedWeek: number 

  sections = [
    { key: 'morning', name: 'Morning'},
    { key: 'lunch', name: 'Lunch'},
    { key: 'evening', name: 'Evening'},
    { key: 'snacks', name: 'Snacks'}    
  ]

  // note that our variable 'selected day' comes from a subscription made to the
  // store in the schedule container component. 
  
  // the chain of events goes like this: The schedule container sets the behavior subject with a new 
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

  @Input()
  items: ScheduleList

  @Output()
  change = new EventEmitter<Date>()

  @Output()
  select = new EventEmitter<any>()

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDay = this.day
  }

  ngOnInit(): void {    
  }

  get day() {
    const day = this.selectedDate.getDay()
    return day === 0 ? 6 : day - 1    
  }

  changeSelectedDate(weekOffset: number) {   
    let currentDate = new Date()       
    var startOfWeek = this.getStartOfWeekOn(currentDate)
    var startOfWeekWithOffset = this.getStartWeekWithOffset(startOfWeek, weekOffset)
    this.change.emit(startOfWeekWithOffset)
  }

  private getStartOfWeekOn(anyDate: Date) : Date {        
    const dayOfWeek = this.getDayOfWeekFrom(anyDate)
    const dayOfMonth = anyDate.getDate()
    const startDayOfWeek = dayOfMonth - dayOfWeek 
    return new Date(anyDate.setDate(startDayOfWeek) )
  }

  private getDayOfWeekFrom(currentDate: Date) {
    const dayOfWeek = currentDate.getDay()
    const isSunday = dayOfWeek === 0
    const offset = isSunday ? (7 - 1) : -1
    return dayOfWeek +  offset
  } 
  
  private getStartWeekWithOffset(startOfWeek: Date, offset: number) : Date {
    const weekOffset =  offset * 7
    const startWeekWithOffset = startOfWeek.getDate() + weekOffset
    return new Date(startOfWeek.setDate(startWeekWithOffset))
  }

  // the interface is change due to our logic coded in the schedule days component
  // but we need to notify the container of our new date selected in our 'days component'
  changeSelectedWeekDay(weekDay: number) {
    var startOfWeek = this.getStartOfWeekOn(this.selectedDate)
    const newDate = new Date(startOfWeek.setDate(startOfWeek.getDate() + weekDay))
    this.change.emit(newDate)
  }

  getScheduleItemFromCurrent(section: string) {

    if (this.items && this.items[section]) { 
      return this.items[section]
    }
    return {}
  }

  onItemSelect({type, assignedItems,  data}: any, sectionKey: string) { 
      
    const selectedDate = this.selectedDate
    this.select.emit({
      type, 
      assignedItems, 
      data,
      selectedDate,
      sectionKey
    })
  }
}
