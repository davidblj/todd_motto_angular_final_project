import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from 'src/app/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date())

  schedule$ = this.date$.pipe(
    tap((next) => this.store.set('date', next))
  ) 

  update(date: Date) {
    this.date$.next(date)
  }

  constructor(private store: Store) { }
}
