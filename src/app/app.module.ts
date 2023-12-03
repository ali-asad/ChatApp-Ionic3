import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { AdsPage } from '../pages/ads/ads';
import { ChatsPage } from '../pages/chats/chats';
import { ChatPage } from '../pages/chat/chat';
import { ChatPopover } from '../pages/chat/chat-popover';
import { ChatBgPage } from '../pages/chat-bg/chat-bg';
import { ChatBuyerPopover } from '../pages/chat-bg/chat-buyer-popover';
import { SettingPage } from '../pages/setting/setting';
import { SaveNamePage } from '../pages/setting/change/save-name/save-name';
import { SaveEmailPage } from '../pages/setting/change/save-email/save-email';
import { SavePasswordPage } from '../pages/setting/change/save-password/save-password';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ServiceProvider } from '../providers/service/service';
import { HttpProvider } from '../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseProvider } from '../providers/firebase/firebase';

var firebaseConfig = {
  apiKey: "AIzaSyD4oGCfd-ba6wKqaB_JCygfXhKKWf9vA8A",
  authDomain: "simon-jang-chat.firebaseapp.com",
  databaseURL: "https://simon-jang-chat.firebaseio.com",
  projectId: "simon-jang-chat",
  storageBucket: "simon-jang-chat.appspot.com",
  messagingSenderId: "368769488477",
  appId: "1:368769488477:web:5f81e7107d0a8c02019fb4",
  measurementId: "G-WC521KS7FD"
};
firebase.initializeApp(firebaseConfig);

const pages = [ 
  LoginPage, 
  RegisterPage, 
  ProfilePage, 
  TabsPage, 
  AdsPage,
  ChatsPage,
  ChatPage, 
  ChatPopover,
  ChatBgPage, 
  ChatBuyerPopover, 
  SettingPage,
  SaveNamePage,
  SaveEmailPage,
  SavePasswordPage
];

const nativeProviders = [ SplashScreen, StatusBar ];

@NgModule({
  declarations: [
    MyApp,
    pages
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pages
  ],
  providers: [ 
    nativeProviders,
    ServiceProvider,
    HttpProvider,
    Camera,
    Firebase,
    FirebaseProvider,
    GooglePlus,
    OauthCordova,
    AngularFireDatabase,
    Facebook
   ]
})
export class AppModule {}
