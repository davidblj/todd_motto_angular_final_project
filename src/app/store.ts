
import {pluck, distinctUntilChanged} from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './auth/shared/services/auth.service';
import { Meal } from './health/shared/services/meals.service';
import { Workout } from './health/shared/services/workouts.service';

export interface State {
  user: User,
  meals: Meal[],
  date: Date,
  selectedItem: any,
  selectedList: any, 
  workouts: Workout[]
  [key: string]: any
}

// store initial value with undefined properties
const state: State = {
  user: undefined,
  meals: undefined,   
  date: undefined,
  selectedItem: undefined,
  selectedList: undefined,
  workouts: undefined
};

export class  Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }
  
  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
