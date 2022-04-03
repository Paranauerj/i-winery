import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userEmail = localStorage.getItem("UserEmail");

  private loginEvent = new Subject<any>();

  constructor() { }

  public login(email, password){
    localStorage.setItem("UserEmail", email);
    this.loginEvent.next(email);

    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  getObservable(): Subject<any> {
    return this.loginEvent;
  }

  public register(email, password, name){
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public forgotMyPassword(email){
    
  }

  public isLogged(){
    return localStorage.getItem("UserEmail") !== null;
  }

  public logout(){
    localStorage.removeItem("UserEmail");
  }

}
