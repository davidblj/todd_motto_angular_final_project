import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from 'src/app/store';
import { tap } from 'rxjs/operators';
import { User as FirebaseUser } from 'firebase';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {
  
  auth$ = this.af.authState.pipe(
    tap(this.setStore.bind(this))    
  )

  constructor(
    private af: AngularFireAuth,
    private store: Store) { }

  setStore(user: FirebaseUser) {
    
    // logout store update
    if (!user) {
      this.store.set('user', null);
      return;
    }

    // this piece of code is going to get called
    // each time the 'loginUser' is also called
    const currentLoggedInUser: User = {
      email: user.email,
      uid: user.uid,
      authenticated: true
    }

    // user log in
    this.store.set('user', currentLoggedInUser);    
  }

  get currentUser() {    
    return this.af.user 
  }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);    
  }

  logOutUser() {
    return this.af.signOut();
  }
}
