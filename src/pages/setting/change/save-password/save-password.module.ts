import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavePasswordPage } from './save-password';

@NgModule({
  declarations: [
    SavePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SavePasswordPage),
  ],
})
export class SavePasswordPageModule {}
