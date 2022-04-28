import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  //constructor() { }

  userEmail;
  userInfo;

  constructor(private navController: NavController, private authService: AuthService, private userService: UserService) {
    this.userEmail = authService.userEmail;

    userService.getInfo().then((data) =>{
      console.log(data);
      this.userInfo = data;
    });
    
  }

  ngOnInit() {
  }

}
