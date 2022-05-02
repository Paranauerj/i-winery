import { Component, OnInit } from '@angular/core';
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

      wineService.allUserEvaluation();
    });

    this.LoadWineInfo_A();
  }

  ngOnInit() {
  }

  LoadWineInfo_A(){
    this.wineService.allUserEvaluation().then(response=>{
      //console.log(response.size);
      response.forEach(evaluation =>{
        //console.log(evaluation.data()["wineId"]);
        this.starsEvaluated.push(evaluation.data()["stars"]);
        console.log(evaluation.data()["stars"]);
        this.wineService.getInfo(evaluation.data()["wineId"]).subscribe(response_Wine=>{
            //console.log(response_Wine.data());
            this.winesEvaluated.push(response_Wine.data());
        })
      })
    })
  }
}
