import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveNamePage } from './save-name';

@NgModule({
  declarations: [
    SaveNamePage,
  ],
  imports: [
    IonicPageModule.forChild(SaveNamePage),
  ],
})
export class SaveNamePageModule {}
