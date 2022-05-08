import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  db;

  private loginEvent = new Subject<any>();

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
  }

  public login(email, password){
    var request = this.auth.signInWithEmailAndPassword(email, password);
    request.then((response) => {
      localStorage.setItem("UserEmail", email);
      this.setUserId(email);

      this.loginEvent.next(email);
    });
    
    return request;
  }

  public getUserEmail(){
    return localStorage.getItem("UserEmail");
  }

  public getUserId(){
    return localStorage.getItem("UserId");
  }

  private setUserId(email){
    this.firestore.collection("users").ref.where("email", "==", email).get().then(querySnapshot => {
      querySnapshot.forEach(doc =>{
        localStorage.setItem("UserId", doc.id);
      });
    });
  }

  getObservable(): Subject<any> {
    return this.loginEvent;
  }

  public register(email, password, name){
    var request = this.auth.createUserWithEmailAndPassword(email, password);
    request.then(() => {
      this.firestore.collection("users").add({
        email: email,
        name: name,
        role: "user"
      });
    });

    return request;
  }

  public forgotMyPassword(email){
    return this.auth.sendPasswordResetEmail(email);
  }

  public isLogged(){
    return localStorage.getItem("UserEmail") !== null;
  }

  public logout(){
    this.auth.signOut();
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("UserId");
  }
  
}
