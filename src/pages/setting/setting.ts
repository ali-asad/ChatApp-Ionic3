import { NgZone, Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, ToastController, ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SaveNamePage } from '../setting/change/save-name/save-name';
import { SaveEmailPage } from '../setting/change/save-email/save-email';
import { SavePasswordPage } from '../setting/change/save-password/save-password';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  public img_url: string = "assets/images/user-tn2.jpg";
  public first_name: string;
  public last_name: string;
  public email: string = "mydream.tiger@gmail.com";
  public location: string = "Las Vegas, CA";
  public password: string = "***";
  public captureDataUrl : string;
  loading: Loading;  
  public isToggled : boolean;
  public firebase_id: string;
  firestore = firebase.storage(); 

  constructor(
    public navCtrl: NavController, 
    public zone: NgZone,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public toaster: ToastController,
    public loadingCtrl: LoadingController,
    public fireaseProvider: FirebaseProvider,
    public httpProvider: HttpProvider,
  ) 
  {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  Listing(){
    
  }

  userProfilePhoto(){
    let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
              text: 'Photo Library',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
          },       
          {
              text: 'Cancel',
              role: 'cancel'
        }]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
      
    // Create options for the Camera Dialog
    var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
        
        this.img_url = 'data:image/jpeg;base64,' + imagePath;   
        this.uploadImage(); 
    }, (err) => {
      this.presentToast('Selecting image canceled.');
    });
  }

  public uploadImage() {

    if(this.img_url != undefined){        
        let storageRef = firebase.storage().ref();
        var filename = Math.floor(Date.now() / 1000);       
        const imageRef = storageRef.child(`images/${filename}.jpg`);
        this.showLoading('Uploading...');

        imageRef.putString(this.img_url, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {            
            this.loading.dismiss();
            this.presentToast('Upload Success!');
          
            this.firestore.ref().child(`images/${filename}.jpg`).getDownloadURL().then((url) => {
                this.zone.run(() => {
                  var image = {
                    photoURL: url
                  }
                  this.fireaseProvider.userRegister(image); 
                  this.updateUserPhoto(image);                                                  
                })
            })
        }, (err) => {
            this.loading.dismissAll();
            this.presentToast('Upload Failed!');
        });     
      }
  }

  updateUserPhoto(image){  
    firebase.auth().signInWithEmailAndPassword(this.fireaseProvider.email, this.fireaseProvider.password)
    .then(function(user) {       
        user.updateProfile(image).then(function() {  
            this.presentToast('Profile updated successfully!');      
        }, function(error) {
          this.presentToast('An error happened');         
        })
    });
  }

  updateUserName(){   
    this.navCtrl.push(SaveNamePage, {
      first_name: this.first_name,
      last_name: this.last_name,
      user_id: this.httpProvider.primary_key
    });
  }

  updateEmail(){
    this.navCtrl.push(SaveEmailPage); 
  }

  updatePassword(){
    this.navCtrl.push(SavePasswordPage); 
  }

  enableNotification(){ 
      console.log("Toggled: "+ this.isToggled); 
      if(this.isToggled == true)
      {
     
      }
      else{
        
      }
  }

  private presentToast(text) {
    
    let toast = this.toaster.create({
        message: text,
        duration: 3000,
        position: 'top'
    });
    toast.present();
  }

  public showLoading(text) {
    this.loading = this.loadingCtrl.create({
        content: text,
        dismissOnPageChange: true
    });
    this.loading.present();
  }

}
