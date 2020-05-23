import { Injectable } from '@angular/core';
import { Store } from 'src/app/store';
import { tap, map, flatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {
 
  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  get meals() : Observable<Meal[]>{    
    
    return this.currentUser.pipe(
      flatMap(user => {      
        
        let userid = user.uid
        return this.db
          .collection<Meal>(`mealsVault/${userid}/meals`)
          .valueChanges()        
      }),
      tap(meals => {

        this.store.set('meals', meals)
      })
    )      
  }

  setStore(meals : Meal[]) {
    this.store.set('meals', meals)
  }

  get currentUser() : Observable<User> {
    return this.authService.currentUser
  }
}
