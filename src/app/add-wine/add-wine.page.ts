import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { WineService } from '../services/wine.service';

@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.page.html',
  styleUrls: ['./add-wine.page.scss'],
})

export class AddWinePage implements OnInit {

  addWineForm;
  img_upload: any = [];
  selectedImage;
  imageUrl;

  constructor(
    private wineService: WineService, 
    private authService: AuthService, 
    private angularFireStorage: AngularFireStorage, 
    private toastController: ToastController, 
    private navController: NavController
  ) 
  { 
    this.addWineForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(46)
      ])),

      country: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(46)
      ])),

      producer: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(46)
      ])),

      type: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(46)
      ])),

      year: new FormControl('', Validators.compose([
        Validators.pattern("[0-9][0-9][0-9][0-9]"),
        Validators.required,
        Validators.min(1800),
        Validators.max(new Date().getFullYear()),
      ])),

      image: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[^\\s]+(.*?)\\.(jpg|jpeg|png|bmp|JPG|JPEG|PNG|BMP)$")
      ]))

    });

  }

  ngOnInit() {
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  onSubmit(){

    var storageRef = this.angularFireStorage.storage.ref();
    var imageRef = storageRef.child('images/' + this.uniqid());

    imageRef.put(this.selectedImage).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });

    var wineData = {
      name: this.addWineForm.controls["name"].value,
      country: this.addWineForm.controls["country"].value,
      producer: this.addWineForm.controls["producer"].value,
      type: this.addWineForm.controls["type"].value,
      year: this.addWineForm.controls["year"].value,
      ownerId: this.authService.getUserId(),
      image: imageRef.fullPath
    }

    this.wineService.addWine(wineData).then(response => {
      this.presentToast();
      this.navController.navigateBack("/main");
    });
  }


  uniqid(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vinho Adicionado com Sucesso!',
      duration: 2000
    });
    toast.present();
  }

}
