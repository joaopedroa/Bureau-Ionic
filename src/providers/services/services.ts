import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import {User} from '../user'

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  constructor(public http: HttpClient,private afAuth: AngularFireAuth) {
    console.log('Hello ServicesProvider Provider');
  }

  emailLogin(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
        })
        .catch(error => console.log(error));
  }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      console.log(user);
    })
    .catch(error => console.log(error));
  }

  signOut(): void {
    this.afAuth.auth.signOut();   
  }

  createUser(user: User) {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(user.email, user.password);
  }

}
