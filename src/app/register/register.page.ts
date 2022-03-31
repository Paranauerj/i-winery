import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm;
  registerErr;

  constructor
  (
    public alertController: AlertController,
    private router: Router,
    private navController: NavController
  ) 
  {
    this.registerForm = new FormGroup({

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.email
      ])),

      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(46)
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])),

      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])),

      /*role: new FormControl('', Validators.compose([
        Validators.required
      ]))*/

    },
    {
      validators: this.checkPasswords
    });
  }

  ngOnInit() {
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Termos e condições',
      message: 'Está ciente e concorda com os <a href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal">termos e condições</a> de uso da aplicação?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            this.registerErr = "Termos e condições não aceitos"
            console.log('Cancelou :(');
          }
        }, {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            var email = this.registerForm.controls["email"].value;
            var password = this.registerForm.controls["password"].value;
            var name = this.registerForm.controls["name"].value;

            AuthService.register(email, password, name).then(registerResult => {
              this.router.navigate(['/login']);
            })
            .catch(() => {
              this.registerErr = "Erro ao contatar servidor";
            });

          }
        }
      ]
    });
    await alert.present();
  }

}
