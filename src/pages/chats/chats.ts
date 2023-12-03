import { Component } from '@angular/core';

import { NavController, NavParams, App } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  public chat = "selling";
  public chat_users: any = [];
  public menu_hidden:boolean = false; 
  private appUserId: any;
  nickname = '';
  constructor(
    public nav: NavController, 
    public app: App,
    public navParams: NavParams,  
    public firebaseProvider: FirebaseProvider,
    public angularfire: AngularFireDatabase, 
  ) 
  {
    this.menu_hidden = this.navParams.get('menu');
    this.appUserId = firebase.auth().currentUser.uid;
    
    this.firebaseProvider.getUsers().subscribe((res) =>{
      this.chat_users = res;
    });    
  }

  public openChat(chat_user) {
    this.app.getRootNav().push(ChatPage,{
      chat_user: chat_user
    });
  }

  public delete(){
    
  }

  searchValue(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.chat_users = this.chat_users.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
