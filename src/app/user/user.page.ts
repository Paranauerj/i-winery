import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  //constructor() { }

  userEmail;

  constructor(private navController: NavController, private authService: AuthService) {
    this.userEmail = authService.userEmail;
  }

  ngOnInit() {
  }

}
