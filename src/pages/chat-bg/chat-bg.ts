import { Component } from '@angular/core';
import { NavController,  PopoverController } from 'ionic-angular';
import { ChatBuyerPopover } from './chat-buyer-popover'

@Component({
  selector: 'page-chat-bg',
  templateUrl: 'chat-bg.html'
})
export class ChatBgPage {

  constructor(public nav: NavController, public popoverCtrl: PopoverController) {

  }
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(ChatBuyerPopover, {

    });

    popover.present({
      ev: ev
    });
  }

}
