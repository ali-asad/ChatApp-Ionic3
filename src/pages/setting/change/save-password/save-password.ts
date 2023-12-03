import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../../../providers/firebase/firebase';
import { HttpProvider } from '../../../../providers/http/http';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-save-password',
  templateUrl: 'save-password.html',
})
export class SavePasswordPage {
  public new_password1: string;
  public new_password2: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toaster: ToastController,
    public fireaseProvider: FirebaseProvider,
    public httpProvider: HttpProvider,    
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavePasswordPage');
  }

  change(){ 
  
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
