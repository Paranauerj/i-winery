import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm;

  constructor() 
  {
    this.registerForm = new FormGroup({

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.email
      ]))

    });
  }

  ngOnInit() {
  }

}
