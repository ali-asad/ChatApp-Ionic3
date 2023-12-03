import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class HttpProvider {

  contentHeader: Headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
  public api_token: string;
  public primary_key: string;
  public auth_token: string;
  public id: string;
  constructor(
    public http: Http,  
  ) 
  {
    console.log('Hello HttpProvider Provider');
  }

  logout(){
    return new Promise(resolve => {
      firebase.auth().signOut().then(data => {
          resolve(data);
        }, err => {
          resolve(err);
      });
    });
  }
}


