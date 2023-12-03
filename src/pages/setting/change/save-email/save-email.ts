import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../../../providers/firebase/firebase';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-save-email',
  templateUrl: 'save-email.html',
})
export class SaveEmailPage {
  public email: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fireaseProvider: FirebaseProvider,
    public toaster: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveEmailPage');
  }

  changeEmail(){   
    var useremail = { email: this.email}
    this.fireaseProvider.userRegister(useremail);
    
    var that = this;
    firebase.auth().signInWithEmailAndPassword(that.fireaseProvider.email, that.fireaseProvider.password)
    .then(function(user) {  
        user.updateEmail(that.email).then(function() {  
          that.presentToast('Profile updated successfully!');      
        }, function(error) {
          that.presentToast('An error happened');         
        });    
    });   
  }

  private presentToast(text) {
    
    let toast = this.toaster.create({
        message: text,
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
  }
}
