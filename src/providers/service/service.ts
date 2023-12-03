import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, AlertController, ToastController, NavParams } from 'ionic-angular';

@Injectable()
export class ServiceProvider {
  public lat: any;
  public long: any;
  public range: any = 50;
  public fb_user_id : any;
  constructor(
    public http: Http,
    public toastCtrl: ToastController,
  ) 
  {
    console.log('Hello ServiceProvider Provider');
  }

  public toast(text){  
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,  
    });
    toast.present();
  }
}
