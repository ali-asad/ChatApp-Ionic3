import { Component } from '@angular/core';

import { NavController, App, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SettingPage } from '../setting/setting';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {
  public toggled: boolean;
  public showSearchResults: boolean;
  public menu_hidden:boolean = false ;  
  public google_icon = "assets/images/google-icon.png";
  public facebook_icon = "assets/images/facebook-icon.png";

  private username: string;
  private email: string;

  constructor(
    public nav: NavController, 
    public app: App, 
    public navParam: NavParams,
    public firebaseProvider: FirebaseProvider,
  ) 
  {
    this.toggled = false;
    this.showSearchResults = true;
    if(this.navParam.get('menu') != undefined)
      this.menu_hidden = this.navParam.get('menu');

    this.username = this.firebaseProvider.appUser.displayName;
    this.email = this.firebaseProvider.appUser.email;  
  }

  goSetting(){
    this.nav.push(SettingPage);
  }

  editProfile(){
    this.nav.push(ProfilePage);
  }

}
