import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {LoginPage} from '../pages/login/login'
import { ServicesProvider } from '../providers/services/services';



const firebaseAuth = {
  apiKey: "AIzaSyB4uniUbS1wBc_crXyYVrA-SI8N1s7b_pU",
  authDomain: "bureau-ionic.firebaseapp.com",
  databaseURL: "https://bureau-ionic.firebaseio.com",
  projectId: "bureau-ionic",
  storageBucket: "bureau-ionic.appspot.com",
  messagingSenderId: "563959668879" 
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
   
  ]
})
export class AppModule {}
