import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  getInfoFromCurrentUser(){
    return this.firestore.collection("users").doc(this.authService.getUserId()).get();
  }

  getInfoFromUserId(userId){
    return this.firestore.collection("users").doc(userId).get();
  }

}
