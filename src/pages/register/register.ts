import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private alertCtrl: AlertController) {}

  public register() {
    this.createSuccess = true;
    this.showPopup("Success", "Account created.");
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  public goToLogin() {
    this.nav.push(LoginPage);
  }
}
