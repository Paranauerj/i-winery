import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalWineDetailsComponent } from '../components/modal-wine-details/modal-wine-details.component';
import { AuthService } from '../services/auth.service';
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
  alreadyEvaluated = false;
  evaluationId;
  wineId;
  isOwner = false;

  constructor
  (
    private router: Router, 
    private wineService: WineService, 
    private authService: AuthService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private navController: NavController
  ) 
  { 
    this.presentLoading();

    var wineIdParam = this.router.getCurrentNavigation().extras.state;
    this.wineId = wineIdParam ? wineIdParam : "Cz2xVQJVjIvXctwlDhgY";

    wineService.userEvaluation(this.wineId).then(response => {
      response.forEach(values => {
        this.setStars(values.data()["stars"]);
        this.alreadyEvaluated = true;
        this.evaluationId = values.id;
      });
    });

    this.LoadWineInfo();
    this.LoadWineInteractions();
  }

  LoadWineInfo(){
    this.wineService.getInfo(this.wineId).subscribe((response) => {
      this.wineInfo = response.data();
      this.wineInfo.image = this.wineInfo.image ? this.wineInfo.image : "../../assets/appImages/wineDefaultIcon.png";
      if(this.wineInfo.ownerId == this.authService.getUserId()){
        this.isOwner = true;
      }
    });
  }

  LoadWineInteractions(){
    this.wineService.getInteractions(this.wineId).subscribe((response) => {
      this.wineInteractions = response;
    });
  }


  setStars(num){
    this.stars = num;
  }

  sendAvaliation(){
    this.presentToast();
    
    if(this.alreadyEvaluated) {
      this.wineService.updateEvaluation(this.evaluationId, this.wineId, this.stars);
      return;
    }
    
    this.wineService.evaluate(this.wineId, this.stars).then(response => {
      this.evaluationId = response.id;
      this.alreadyEvaluated = true;
    });

  }

  goToInteractionPage(){
    this.navController.navigateForward("/add-interaction", { state: this.wineId })
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
      componentProps: Object.assign(this.wineInteractions[index].Record, {name: this.wineInfo.name, interactionKey: this.wineInteractions[index].Key})
    });
    return await modal.present();
    // console.log(index, this.wineInteractions[index]);
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Avaliado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  

}
