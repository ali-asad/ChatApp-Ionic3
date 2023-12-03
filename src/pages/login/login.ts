import { Component } from '@angular/core';
import { ActionSheetController, NavController , AlertController, Loading, ToastController, LoadingController,} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import * as firebase from 'firebase';
import { ServiceProvider } from '../../providers/service/service';
import { HttpProvider } from '../../providers/http/http';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  singinCredentials = {username: '', email: '', password: ''};
  registerCredentials = {username: '', email: '', register_pw: '', pw_conform: ''};

  public google_icon = "assets/images/google-icon.png";
  public facebook_icon = "assets/images/facebook-icon.png";
  public brand_name = "assets/images/brand-name.png";
  public logo_icon = "assets/images/logo.png";
  public auth_login: boolean = true;
  public createSuccess = false;
  public show_pw: string ='password';
  public show : string = 'password';
  public loading : Loading;
  public left_bottom: any = 'border_bottom';
  public right_bottom: any;

  public api_token: string;
  public primary_key: string;
  public auth_token: string;
  public id: string;

  constructor(
    private nav: NavController,
    public serviceProvider: ServiceProvider,
    public httpProvider: HttpProvider,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public firebaseProvider: FirebaseProvider,
    private loadingCtrl: LoadingController,
    public googleplus: GooglePlus,
    private fb: Facebook,
    public toast: ToastController
  )
  {

  }

  public register() {      
    if(this.registerCredentials.pw_conform == this.registerCredentials.register_pw){
      this.createSuccess = true;     
      this.showLoading('');    

      firebase.auth().createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.register_pw).then((success) =>{
        let data = {
            displayName: this.registerCredentials.username,
            email: success.email,
            online: "online",
            src: success.photoURL,
            userID: success.uid
        };

        this.firebaseProvider.userRegister(data);
        this.loading.dismiss();
        this.firebaseProvider.appUser = data;

        this.nav.setRoot(TabsPage);
      }).catch((error) => {       
        this.loading.dismiss();   
        this.showAlert('Warning!', error['code']);
      }); 
    }      
    else{
      this.showAlert("Warning", "Passwords don't match.");   
      this.registerCredentials.pw_conform = '';
      this.registerCredentials.register_pw = '';
    }
  }

  public login() {  
    if(this.singinCredentials.email != '' && this.singinCredentials.password != ''){
      this.showLoading(''); 

      firebase.auth().signInWithEmailAndPassword(this.singinCredentials.email, this.singinCredentials.password).then((success) => {  

        this.firebaseProvider.getUser(success.uid).subscribe((res)=>{
          this.loading.dismiss();
          this.firebaseProvider.appUser = res;

          this.nav.setRoot(TabsPage);
        });
      }).catch((error) => {
        this.loading.dismiss();
        this.showAlert('Warning!', 'This user is not registed.');
      });      
    } 
    else{
      this.showAlert('Warning!', 'Please input username or password.');
    }
  }

  public logout(){
    this.httpProvider.logout().then( res => {
      console.log(res);
    });
  }  
 
  public googleLogin() {
     this.showLoading('');
     this.googleplus.login({
       'webClientId': '515598822397-tge3ul5p08uas9f3kfh70ob8bscoqoc4.apps.googleusercontent.com'
     }).then((success) => {
       console.log(success);
       let credential = firebase.auth.GoogleAuthProvider.credential(success['idToken'], null);
       firebase.auth().signInWithCredential(credential)
         .then((success) => {
           this.loading.dismiss();
         })
         .catch((error) => {
           console.log(error);
           this.loading.dismiss();
           let code = error["code"];
           this.showAlert('Warning!', code);
         });
     }, error => {  
       console.log(error);
        this.loading.dismiss();});
   }
 
   public forgotPassword() {
     let prompt = this.alertCtrl.create({
       title: 'Forgot Password',
       message: "Please type your email here.",
       inputs: [
         {
           name: 'email',
           type: 'email',
           placeholder: 'Type email here'
         },
       ],
       buttons: [
         {
           text: 'Cancel',
           handler: data => {
             console.log('Cancel clicked');
           }
         },
         {
           text: 'Done',
           handler: (data) => {
             if (this.isValidEmail(data.email)) {
               this.sendPasswordReset(data.email);
             } else {
               this.showAlert('Warning!', 'Invalid email.');
             }
           }
         }
       ]
     });
     prompt.present();
   }
 
   public sendPasswordReset(user_email) {

   }

  public isValidEmail(email: string){
     let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
     if (email != "" && (email.length <= 5 || !EMAIL_REGEXP.test(email)) || !email) {
         return false;
     } 
     return true;
  } 
 
  signin_seg(){
    this.auth_login  = true;
    this.left_bottom = 'border_bottom';
    this.right_bottom = '';
  }

  registerSeg(){
    this.auth_login  = false;
    this.left_bottom = '';
    this.right_bottom = 'border_bottom';
  }

  togglePasswordMode(){
    if(this.show_pw == 'password')
     this.show_pw = 'text'
    else
      this.show_pw = 'password';
  }

  togglePassword(){
    if(this.show == 'password')
     this.show = 'text'
    else
      this.show = 'password';
  }

  public showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  public showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {      
          }
        }
      ]
    });
    alert.present();
  }

  public showLoading(text) {
    this.loading = this.loadingCtrl.create({
        content: text,
        dismissOnPageChange: true
    });
    this.loading.present();
  } 
}
