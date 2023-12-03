import { Component } from '@angular/core';
import { NavController, App, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {
  public checked_items: any = [];
  public title: string;
  public search_val: string;
  public content_id: string = 'modal-content';
  public skills = [
    { name: 'Appaloosa', isChecked: false },
    { name: 'Quarter Horse', isChecked: false },
    { name: 'Thoroughbred', isChecked: false },
    { name: 'Pinto', isChecked: false },
    { name: 'Warmblood', isChecked: false },
    { name: 'Fresian', isChecked: false }
  ];

  constructor( public navParam: NavParams,) {
    console.log('Hello SearchComponent Component');
    this.title = this.navParam.get('list');

    if(this.navParam.get('type') == 'menu'){      
      this.content_id = 'modal-content-menu';
    }
  }

  itemCheck(skill){
    if(skill.isChecked == false){
        skill.isChecked = true;
        console.log(skill.isChecked );
        this.checked_items.push(skill);
    }
    else if(skill.isChecked == true){
        skill.isChecked = false;
        this.checked_items.pop();
    }
    console.log(this.checked_items);
  }

  searchValue(event){
    let val = event.target.value;
    this.search_val = val;
    console.log(this.search_val);
    if (val && val.trim() != '') {
      this.skills = this.skills.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  apply(){

  }

  cancel(){

  }
}
