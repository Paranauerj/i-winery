import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-modal-wine-details',
  templateUrl: './modal-wine-details.component.html',
  styleUrls: ['./modal-wine-details.component.scss'],
})

export class ModalWineDetailsComponent {

  @Input() name: any;
  @Input() move: any;
  @Input() date: any;
  @Input() temperature: any;
  @Input() humidity: any;
  @Input() location: any;
  @Input() id: any;
  @Input() container: any;
  @Input() addedElements: any;
  @Input() responsible: any;
  @Input() interactionKey: any;
  @Input() isAdminOrOwner: any;

  constructor(private modalController: ModalController, private wineService: WineService, private toastController: ToastController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  
  deleteInteraction(){
    this.wineService.removeInteraction(this.interactionKey).subscribe(response => {
      this.presentToast("Interação apagada - saia e entre novamente para ver as atualizações!");
      this.dismiss();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
