import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './shared/shared.module';

/* 
  This module work as follows
 
  you dont navigate through the app into this module components,
  but through the guards (take a look at the health-routing module), as follows. 
  If the user is not authenticated, he is redirected in to the
  login or register component.

  the login and register components are put aside as modules and not component,
  as a user is not usually going to navigate to them, and hence
  we can lazy load them both. 

*/

const firebaseConfig  = {
  apiKey: "AIzaSyBvpMH9MZoxjmNcbAotXjhRf1Bw6RjiUbc",
  authDomain: "fitness-app-4d086.firebaseapp.com",
  databaseURL: "https://fitness-app-4d086.firebaseio.com",
  projectId: "fitness-app-4d086",
  storageBucket: "fitness-app-4d086.appspot.com",
  messagingSenderId: "989694211797",
  appId: "1:989694211797:web:790cc7d370e890a8ff145c"
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
