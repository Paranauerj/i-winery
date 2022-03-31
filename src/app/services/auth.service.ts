import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public static login(email, password){
    localStorage.setItem("UserEmail", email);

    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public static register(email, password, name){
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public static forgotMyPassword(email){
    
  }

  public static isLogged(){
    return localStorage.getItem("UserEmail") !== null;
  }

  public static logout(){
    localStorage.removeItem("UserEmail");
  }

}
