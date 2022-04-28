import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  getInfo(){
    return new Promise((resolve, reject) => {
      resolve({
        email: this.authService.userEmail,
        name: "José das Couves",
        isAdmin: true
      });
    });
  }

}
