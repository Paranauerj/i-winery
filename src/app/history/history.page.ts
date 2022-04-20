import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalWineDetailsComponent } from '../components/modal-wine-details/modal-wine-details.component';
import { WineService } from '../services/wine.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  wineInfo;
  wineInteractions;
  stars = 0;

  constructor
  (
    private router: Router, 
    private wineService: WineService, 
    private loadingController: LoadingController,
    private modalController: ModalController
  ) 
  { 
    this.presentLoading();

    var wineIdParam = this.router.getCurrentNavigation().extras.state;
    var wineId = wineIdParam ? wineIdParam : 1;

    this.LoadWineInfo(wineId);
    this.LoadWineInteractions(wineId);
  }

  LoadWineInfo(wineId){
    this.wineService.getInfo(wineId).then((response) => {
      this.wineInfo = response;
      this.wineInfo.image = this.wineInfo.image ? this.wineInfo.image : "../../assets/appImages/wineDefaultIcon.png";
    });
  }

  LoadWineInteractions(wineId){
    this.wineService.getInteractions(wineId).then((response) => {
      this.wineInteractions = response;
    });
  }

  setStars(num){
    this.stars = num;
  }

  sendAvaliation(){
    this.wineService.evaluate(this.stars);
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'A carregar dados do vinho...',
      duration: 500
    });

    await loading.present();
  }

  async presentInteractionDetails(index) {
    const modal = await this.modalController.create({
      component: ModalWineDetailsComponent,
      componentProps: Object.assign(this.wineInteractions[index], {name: this.wineInfo.name})
    });
    return await modal.present();
    // console.log(index, this.wineInteractions[index]);
  }
}
