import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { WineService } from '../services/wine.service';

@Component({
  selector: 'app-add-interaction',
  templateUrl: './add-interaction.page.html',
  styleUrls: ['./add-interaction.page.scss'],
})
export class AddInteractionPage implements OnInit {

  addInteractionForm;
  interactionTypes;
  containers;
  addedElements = 0;
  today = new Date().toISOString().split("T")[0];
  addInteractionFormError;

  constructor(private router: Router, private wineService: WineService, private toastController: ToastController) { 
    var wineIdParam = this.router.getCurrentNavigation().extras.state;
    var wineId = wineIdParam ? wineIdParam : "Cz2xVQJVjIvXctwlDhgY";

    console.log(wineId);

    this.interactionTypes = this.wineService.moves;
    this.containers = this.wineService.containers;

    this.setupAddInteractionForm();
    
  }

  addElement(){
    this.addInteractionForm.addControl('addedElement' + this.addedElements, new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(3)
    ])));
    this.addInteractionForm.addControl('addedElementQuantity' + this.addedElements, new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern("[0-9]+")
    ])));

    this.addedElements += 1;
  }

  removeElement(){
    if(this.addedElements == 0) return;

    this.addedElements -= 1;
    this.addInteractionForm.removeControl('addedElement' + this.addedElements);
    this.addInteractionForm.removeControl('addedElementQuantity' + this.addedElements);
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.addInteractionFormError = false;

    var elements = [];
    for(var i = 0; i < this.addedElements; i++){
      elements.push({
        name: this.getFormValue("addedElement" + i),
        quantity: this.getFormValue("addedElementQuantity" + i)
      });
    }

    var interaction = {
      date: this.getFormValue("date"),
      location: this.getFormValue("location"),
      responsible: this.getFormValue("responsible"),
      move: this.getFormValue("move"),
      temperature: this.getFormValue("temperature"),
      humidity: this.getFormValue("humidity"),
      container: this.getFormValue("container"),
      addedElements: elements
    };

    this.wineService.saveInteraction(interaction).then((response) =>{
      this.presentToast();

      for(var i = 0; i <= this.addedElements; i++){
        this.removeElement();
      }

      this.setupAddInteractionForm();
      
    }).catch((err) => {
      this.addInteractionFormError = err;
    });

  }

  private getFormValue(key){
    return this.addInteractionForm.controls[key].value;
  }

  /*moveValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value ? {value} : null;
    };
  }*/

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Interação Adicionada com Sucesso!',
      duration: 2000
    });
    toast.present();
  }

  setupAddInteractionForm(){
    this.addInteractionForm = new FormGroup({
      date: new FormControl(this.today, Validators.compose([
        Validators.required
      ])),

      location: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.required
      ])),

      responsible: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(35),
        Validators.required
      ])),

      move: new FormControl(this.interactionTypes[0], Validators.compose([
        Validators.required,
        // this.moveValidator
      ])),

      temperature: new FormControl('', Validators.compose([
        Validators.pattern("[0-9][0-9]?"),
        Validators.required,
        Validators.maxLength(2)
      ])),

      humidity: new FormControl('', Validators.compose([
        Validators.pattern("[0-9][0-9]?"),
        Validators.required,
        Validators.maxLength(2)
      ])),

      container: new FormControl(this.containers[0], Validators.compose([
        Validators.required
        // validador customizado
      ]))

    });
  }
}
