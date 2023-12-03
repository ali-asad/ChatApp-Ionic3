import { Component } from '@angular/core';
import { NavController, App, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'range',
  templateUrl: 'range.html'
})
export class RangeComponent {

  title: string;
  value: string;

  constructor( 
    public navParam: NavParams,
    public viewCtrl: ViewController
  ) 
  {
    console.log('Hello RangeComponent Component');
    this.title = this.navParam.get('list');
    console.log(this.title);
  }

  changeRange(range){
    console.log(range);
    this.value = range;
  }

  apply(){
    console.log(this.value);
    this.viewCtrl.dismiss({
      list: this.value
    });
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  reset(){
    this.value = '';
  }
}
