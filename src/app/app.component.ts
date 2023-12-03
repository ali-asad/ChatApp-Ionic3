import { Component, ViewChild} from '@angular/core';
import { Nav, MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ChatsPage } from '../pages/chats/chats';
import { AdsPage } from '../pages/ads/ads';
import { HttpProvider } from '../providers/http/http';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;

  public category: any = [];

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public menu: MenuController,
    public httpProvider: HttpProvider
  ) 
  {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page) {
    this.menu.close();

    if(page == 'comments')
    {
      this.nav.push(ChatsPage, {
        menu: true
      });
    }
    else if(page == 'account')
    {
      this.nav.push(AdsPage, {
        menu: true
      });   
    }
    else if(page == 'Logout'){
        this.httpProvider.logout();
        this.nav.setRoot(LoginPage);
    }       
  }

  public profile(){
    
  }

  popView(){
    this.menu.close();
  }
}
