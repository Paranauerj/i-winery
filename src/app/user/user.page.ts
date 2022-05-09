import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { __values } from 'tslib';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { WineService } from '../services/wine.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  userEmail;
  userInfo;
  wineId;
  wineInfo;
  winesOwned = [];
  winesEvaluated = [];
  starsEvaluated = [];

  constructor(
    private navController: NavController, 
    private authService: AuthService, 
    private userService: UserService,
    private wineService: WineService
  ) 
  {
    this.userEmail = authService.getUserEmail();

    userService.getInfoFromCurrentUser().subscribe((queryUserInfo) =>{
      this.userInfo = queryUserInfo.data();
    });

    this.LoadWinesRatings();
    this.LoadWinesOwned();
  }

  ngOnInit() {
  }

  LoadWinesRatings(){
    this.wineService.allUserEvaluation().then(response => {
      response.forEach(evaluation =>{
        this.starsEvaluated.push(evaluation.data()["stars"]);

        this.wineService.getInfo(evaluation.data()["wineId"]).subscribe(responseWine => {
          if(responseWine.exists){
            var aux = responseWine.data();
            aux["id"] = responseWine.id;
            this.winesEvaluated.push(aux);
          }
        });

      });
    });
  }

  LoadWinesOwned(){
    this.wineService.getOwned().then(response => {
      response.forEach(wine => {
        var aux = wine.data();
        aux["id"] = wine.id;
        this.winesOwned.push(aux);
      });
    })
  }

  /*openHistory(wineId){
    this.navController.navigateForward("/history", );
  }*/

}
