import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Store } from 'src/app/store';
import { tap, switchMap, map } from 'rxjs/operators';
import { Meal } from './meals.service';
import { Workout } from './workouts.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { User, firestore } from 'firebase';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number, 
  $key?: string 
}

// the last property is set so we can make a typsecript 'look up'
// on this object 
export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date())  

  // schedule$ = this.date$.pipe(
  //   tap((next) => this.store.set('date', next))
  // ) 

  schedule$ = combineLatest(this.date$, this.currentUser).pipe(
    tap(([date, _]) => this.store.set('date', date)),
    switchMap(([date, user]) => this.getUserScheduleOrderedByTimeRange(user, date)),
    map(this.buildScheduleListByScheduleItemSection),
    tap((scheduleList) => this.store.set('schedule', scheduleList))
  )

  constructor(
      private store: Store,
      private db: AngularFirestore,
      private authService: AuthService
    ) { } 

  private get currentUser() : Observable<User> {
    return this.authService.currentUser
  }

  private getUserScheduleOrderedByTimeRange(user: User, date: Date) { 

    const {startAt, endAt} = this.getTimeRangeOf(date)     
    return this.getSchedulesPathByUserAndTimeRange(user, startAt, endAt).valueChanges()    
  }

  private getTimeRangeOf(date: Date) { 

    const startAt = firestore.Timestamp.fromDate((
      new Date(date.getFullYear(), date.getMonth(), date.getDate())
    ))

    const endAt = firestore.Timestamp.fromDate((
      new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 1), (date.getSeconds() - 1))
    ))
    
    return {startAt, endAt}
  }

  private getSchedulesPathByUserAndTimeRange(user: User, startAt: firestore.Timestamp, endAt: firestore.Timestamp) {

    return this.db
      .collection('schedules')
      .doc(user.uid)
      .collection('userSchedules', this.filterScheduleByTimeRange(startAt, endAt))
  }

  private filterScheduleByTimeRange(startAt: firestore.Timestamp, endAt: firestore.Timestamp) { 

    return (schedule) => {      
      return schedule
          .where('timestamp', '>=', startAt)
          .where('timestamp', '<=', endAt)
          .orderBy('timestamp')
    }
  }

  private buildScheduleListByScheduleItemSection(schedules: ScheduleItem[]) : ScheduleList {

    const scheduleList: ScheduleList = {}

    for (const schedule of schedules) {
      const scheduleIsNotMapped = !scheduleList[schedule.section]
      if (scheduleIsNotMapped) {
        scheduleList[schedule.section] = schedule
      }
    }

    return scheduleList
  }

  update(date: Date) {
    this.date$.next(date)
  }  
}
