import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-my-password',
  templateUrl: './forgot-my-password.page.html',
  styleUrls: ['./forgot-my-password.page.scss'],
})
export class ForgotMyPasswordPage implements OnInit {

  passRecForm;

  constructor
  (
    private navController: NavController
  ) 
  {
    this.passRecForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(42)
      ]))
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.navController.back();
  }

}
