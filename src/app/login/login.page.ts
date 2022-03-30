import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm;
  loginErr;

  constructor
  (
    private navController: NavController
  ) 
  {
    this.loginForm = new FormGroup({

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(42)
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]))

    });
  }

  ngOnInit() {
  }

  onSubmit(){
    localStorage.setItem("UserEmail", this.loginForm.controls["email"].value);
    this.navController.navigateRoot("/main");
    // console.log("Faço nada ainda");
  }

  /*goForward(route: string){
    this.navController.navigateForward(route);
  }*/

}
