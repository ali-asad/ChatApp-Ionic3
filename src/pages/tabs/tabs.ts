import { Component } from '@angular/core';
import { ModalController, NavController, App} from 'ionic-angular';

import { AdsPage } from '../ads/ads';
import { ChatsPage } from '../chats/chats';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ChatsPage;
  tab2Root: any = AdsPage;
  public unread: any;

  constructor(
    public nav: NavController, 
    public app: App, 
    public modalCtrl: ModalController,  
    public firebaseProvider: FirebaseProvider,
  ) 
  {
    this.unreadBadgetCount();
  }  

  unreadBadgetCount(){
    var s = 0;
    var that = this;
    var query = firebase.database().ref('accounts/' + firebase.auth().currentUser.uid + '/conversations/').orderByKey();
    query.once("value").then(function (snapshot) {     
        if (snapshot.val() != null) {
          snapshot.forEach(function (childSnapshot) {
            var conversation = childSnapshot; 
            that.firebaseProvider.getUser(conversation.key).subscribe((user) => {      
              if(conversation.val().messagesRead > 0) 
                s = s + conversation.val().messagesRead;     
                console.log(s);                 
                if(s != 0)
                  that.unread = s;
            });          
          });
        }
    });  
  }
}
