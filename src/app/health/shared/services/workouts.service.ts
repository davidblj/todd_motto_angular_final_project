import { Injectable } from '@angular/core';
import { Store } from 'src/app/store';
import { AngularFirestore, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { flatMap, tap, map } from 'rxjs/operators';
import { User } from 'firebase';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  // this is an straight out copy of the 'Workout' component

  get workouts() : Observable<Workout[]>{ 

    return this.currentUser.pipe(
      flatMap(this.getWorkoutsBy.bind(this)),
      tap(this.setStore.bind(this))
    )      
  }

  private getWorkoutsBy(user: User) {    
    let idField = "$key"
    return this.getWorkoutsCollectionPathBy(user).valueChanges({idField})   
  }

  private setStore(workouts : Workout[]) {
    this.store.set('workouts', workouts)
  }

  getWorkoutBy(id: string) {
    
    if (!id) return of({})

    return this.currentUser.pipe(
      flatMap(this.getWorkoutByUserAndWorkoutId.bind(this)(id))
    )
  }

  private getWorkoutByUserAndWorkoutId(workoutId) {
    return (user) => 
      this.getWorkoutsCollectionPathBy(user).doc<Workout>(workoutId).snapshotChanges().pipe(
         map(this.workoutSnapshotToWorkout)
      )    
  }

  private workoutSnapshotToWorkout(workoutSnapshotAction: Action<DocumentSnapshot<Workout>>) : Workout {
    let $key = workoutSnapshotAction.payload.id       
    let workout = workoutSnapshotAction.payload.data()
    return { $key, ...workout }
  }

  add(workout: Workout) {
    return this.currentUser.pipe(
      flatMap(this.addWorkoutByUser.bind(this)(workout))
    )
  }  

  private addWorkoutByUser(workout) {
    return (user) => this.getWorkoutsCollectionPathBy(user).add(workout)
  }

  remove(workout: Workout) {
    return this.currentUser.pipe(
      tap(this.removeWorkoutByUser.bind(this)(workout))
    )
  }

  private removeWorkoutByUser(workout: Workout) {
    return (user) => this.getWorkoutsCollectionPathBy(user).doc(workout.$key).delete()
  }
  
  updateWorkoutById(workout: Workout, id: string) {    
    return this.currentUser.pipe(
      tap(this.updateWorkoutByIdAndUser.bind(this)(workout, id))
    )
  }

  private updateWorkoutByIdAndUser(workout: Workout, id: string) {
    return (user) => this.getWorkoutsCollectionPathBy(user).doc(id).update(workout)
  }

  private get currentUser() : Observable<User> {
    return this.authService.currentUser
  }

  // TODO: change the hierarchy for users/userId/workouts
  private getWorkoutsCollectionPathBy(user) {

    return this.db
      .collection('workouts')
      .doc(user.uid)
      .collection('userWorkouts')
  }
}
