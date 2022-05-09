import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getInfoFromCurrentUser(){
    return this.firestore.collection("users").doc(localStorage.getItem("UserId")).get();
  }

  getInfoFromUserId(userId){
    return this.firestore.collection("users").doc(userId).get();
  }

  getCurrentUserRole(){
    return localStorage.getItem("UserRole");
  }
}
