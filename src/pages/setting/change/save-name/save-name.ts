import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../../../providers/firebase/firebase';
import { HttpProvider } from '../../../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-save-name',
  templateUrl: 'save-name.html',
})
export class SaveNamePage {
  public first_name: string;
  public last_name: string;
  public user_id: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fireaseProvider: FirebaseProvider,
    public toaster: ToastController,
    public httpProvider: HttpProvider,
  )  
  {
    this.first_name = this.navParams.get('first_name');
    this.last_name  = this.navParams.get('last_name');
    this.user_id = this.navParams.get('user_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveNamePage');
  }

  changeName(){
    var name = {
      firstname: this.first_name,
      lastname: this.last_name,
      firebase_id: ''
    }
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
