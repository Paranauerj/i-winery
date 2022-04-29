import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  getInfoFromCurrentUser(){
    return this.firestore.collection("users").doc(this.authService.getUserId()).get();
  }

  getInfoFromUserId(userId){
    return this.firestore.collection("users").doc(userId).get();
  }

}
