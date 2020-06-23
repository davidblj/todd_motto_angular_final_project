import { Injectable } from '@angular/core';
import { Store } from 'src/app/store';
import { tap, flatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from 'firebase';

export interface Meal {
  name: string,
  ingredients: string[],
  $key: string
}

@Injectable()
export class MealsService {
 
  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  /* 
    There are two possible solutions for this service. The solution given by todd
    is by accesing the stored value and looking for a particular meal by id. 
    The one given here, is by consuming a new service looking for that particular meal id
  */
  getMealBy(id: string) {
    
    if (!id) return of({})

    return this.currentUser.pipe(
      flatMap(this.getMealByUserAndMealId.bind(this)(id))
    )
  }

  getMealByUserAndMealId(mealId) {
    return (user) => { return this.getMealsDocumentPathBy(user).doc(mealId).valueChanges() }
  }

  add(meal: Meal) {
    return this.currentUser.pipe(
      flatMap(this.addMealByUser.bind(this)(meal))
    )
  }  

  addMealByUser(meal) {
    return (user) => { this.getMealsDocumentPathBy(user).add(meal) }
  }

  // removing an element is quite interesting, remember we
  // made 2 subscriptions; one 'get' to the store and one 'get' to the meals collection of firestore, 
  // in the meals-component and meals service, respectively. 

  // The dataflow begins with firestore sockets, and its going to emit a new value each time
  // the meals collection mutates. Now as we receive a value due to this change (in the meals service
  // subscription to firestore), our store is going to get updated (due to a tap and flatmap operator)
  // and thanks to store 'subject', whoever is susbcribed to it (the meals variable in the meals component),
  // is also going to get notified of that change, and hence, we inmmediatly see 1 less meals item
  // in the meals interface component. 

  remove(meal: Meal) {
    this.currentUser.pipe(
      tap(this.removeMealByUser.bind(this)(meal))
    ).subscribe()
  }

  removeMealByUser(meal: Meal) {
    return (user) => { this.getMealsDocumentPathBy(user).doc(meal.$key).delete() }
  }

  get meals() : Observable<Meal[]>{ 

    return this.currentUser.pipe(
      flatMap(this.getMealsBy.bind(this)),
      tap(this.setStore.bind(this))
    )      
  }

  getMealsBy(user: User) {    
    let idField = "$key"
    return this.getMealsDocumentPathBy(user).valueChanges({idField})   // add the document id into 
    // the object response as a '$key' property 
  }

  setStore(meals : Meal[]) {
    this.store.set('meals', meals)
  }

  get currentUser() : Observable<User> {
    return this.authService.currentUser
  }

  getMealsDocumentPathBy(user) {

    return this.db
      .collection('meals')
      .doc(user.uid)
      .collection('userMeals')
  }
}
