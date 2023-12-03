import { Component, ViewChild} from '@angular/core';
import { NavController,  NavParams, Platform, Content, ActionSheetController, PopoverController, ToastController } from 'ionic-angular';
import { ChatPopover } from './chat-popover'
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chatMessage') chatMessage;

  public appUserPhoto: any;
  public appUserName: any;  
  public conversationId : any;
  public category: any= [];
  public message: string = '';
  private messagesToShow: any = [];
  private totalMessages: number;
  public avatar: any;
  public chatUserPhoto: string;
  public chatUser: any;
  public chatUserId : any;
  private appUserId = firebase.auth().currentUser.uid;
  public currentTime : string;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public camera: Camera,
    public actionSheet: ActionSheetController,
    public firebaseProvider: FirebaseProvider,
    public navParams: NavParams,  
    public plt: Platform,
    public angularfire: AngularFireDatabase, 
    private toastCtrl: ToastController
  ) 
  {
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    this.currentTime = h+':'+m; 

    this.appUserName = this.firebaseProvider.appUser.displayName;
    this.appUserPhoto = this.firebaseProvider.appUser.src;

    this.chatUser = this.navParams.get('chat_user');   
    this.chatUserId = this.chatUser.userID;
    this.chatUserPhoto = this.chatUser.src;

    this.firebaseProvider.getBeforeConversations(this.chatUserId).subscribe((conversation)=> {
      if(conversation){
        this.conversationId = conversation['conversationId'];
        this.firebaseProvider.getConversationMessages(this.conversationId).subscribe((conversationInfo)=>{          
          this.totalMessages = conversationInfo.length;
          this.messagesToShow = conversationInfo;
          this.scrollBottom();
        })
      }
    })
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(ChatPopover, {

    });
    popover.present({
      ev: ev
    });
  }

  scrollBottom() {
    var that = this;
    setTimeout(function () {
      that.content.scrollToBottom();    
    }, 300);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  sendMessage(){
    if (!this.message.trim()) return;
    this.message = this.message.trim();

    if (this.conversationId) {
      // Add Message to the existing conversation 
      let newMessage = {
        date: new Date().toString(),
        sender: this.appUserId,
        message: this.message,
        src: this.appUserPhoto,          
        type: 'text',
      }

      this.messagesToShow.push(newMessage);
      // Update conversation on database.
      this.updateConversation(newMessage);
    }
    else{      
        var msg = {
          date: new Date().toString(),
          sender: this.appUserId,
          message: this.message,
          src: this.appUserPhoto,          
          type: 'text',
        }
        this.messagesToShow.push(msg);
  
        var users = [];      
        users.push(this.appUserId);
        users.push(this.chatUser.userID);  
  
        this.angularfire.list('conversations').push({
          dateCreated: new Date().toString(),
          messages: this.messagesToShow,
          users: users
        }).then((success) => {
          let conversationId = success.key;       

          this.angularfire.object('/accounts/' + this.appUserId + '/conversations/' + this.chatUser.userID).update({
            conversationId: conversationId,
            messagesRead: 1
          });
          this.angularfire.object('/accounts/' + this.chatUser.userID + '/conversations/' + this.appUserId).update({
            conversationId: conversationId,
            messagesRead: 0
          });
        });   
      }
      this.scrollBottom();
      this.message = '';

      this.setUnreadBadge();
  }

  setUnreadBadge(){
    var that = this;
    var currentConversation = firebase.database().ref('conversations/' + this.conversationId + '/messages');
    currentConversation.limitToLast(1).on('child_added', function (snapshot) {
      var add_msg = snapshot.val();
      if(add_msg.sender == that.appUserId)
        that.firebaseProvider.unread++;
    }); 
  }

  updateConversation(saveMessage) {
    this.firebaseProvider.getUserMessages(this.conversationId, this.totalMessages).set(saveMessage).then((success) => {
      this.resetMessageIndex();
    });
  }

  resetMessageIndex() {
    this.firebaseProvider.getConversationMessages(this.conversationId).subscribe((messages) => {
      this.messagesToShow.forEach((msg, inc) => {
        if (!msg['index']) {
          messages.forEach((message,i) => {
            if (msg['date'] == message['date'] && msg['sender'] == message['sender']) {
              this.messagesToShow[inc]['index'] = i;
            }
          });
        }
      });
    });
  }
  
  autoMessage(msg){
    this.message = this.message + msg;
  }

  attach() {
    let action = this.actionSheet.create({        
        buttons: [{
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            console.log("take photo");
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            
          }
        },{
          text: 'Video',
          icon: 'videocam',
          handler: () => {
            console.log("Video");
            this.takeVideo(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Photo Library',
          icon: 'images',
          handler: () => {
            console.log("Access gallery");          
          }
        }, {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log("cancelled");
          }
        }]
      });
      action.present();
    }

  public takePicture(sourceType) {  
    var options = {      
        quality: 100,
        sourceType: sourceType,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: 0,
    };
  
    this.camera.getPicture(options).then((imagePath) => {        
        this.avatar = 'data:image/jpeg;base64,' +  imagePath;          
    });
    }
  
  public takeVideo(sourceType) {  
    var options = {      
        quality: 100,
        sourceType: sourceType,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.VIDEO,
        cameraDirection: 0,
    };
  
    this.camera.getPicture(options).then((videoPath) => {        
        this.avatar = 'data:image/jpeg;base64,' +  videoPath;          
    });
  }
}
