import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveEmailPage } from './save-email';

@NgModule({
  declarations: [
    SaveEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(SaveEmailPage),
  ],
})
export class SaveEmailPageModule {}
