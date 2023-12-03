import { Component } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public nav: NavController, public app: App) {

  }
  public goToLogin() {
    this.app.getRootNav().push(LoginPage);
  }
}
