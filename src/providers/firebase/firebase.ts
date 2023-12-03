import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {
  public email: string;
  public password: string; 
  public unsendMessage = {};
  public unread: any;
  public appUser: any;

  constructor(
    public http: Http,
    public angularfire: AngularFireDatabase
  ) 
  {
    console.log('Hello FirebaseProvider Provider');
  }

  userRegister(data){   
    this.angularfire.object('/accounts/' + data.userID).update(data);  
  }

  public getUser(userId) {
    return this.angularfire.object('/accounts/' + userId).valueChanges();
  }

  getUsers() {
    return  this.angularfire.list('accounts').valueChanges();
  }

  getCurrentUser() {
    return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid).valueChanges();
  }

  getConversation(conversationId) {
    return this.angularfire.object('/conversations/' + conversationId).valueChanges();
  }

  // Get conversations of the current logged in user.
  getConversations() {
    return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/').valueChanges();
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    return this.angularfire.list('/conversations/' + conversationId + '/messages').valueChanges();
  }

  getUserMessages(conversationId, messageNumber) {
    return this.angularfire.object('/conversations/' + conversationId +'/messages/'+ messageNumber);
  }

  getBeforeConversations(chatUserId){
    return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/'+ chatUserId).valueChanges();
  }

}
