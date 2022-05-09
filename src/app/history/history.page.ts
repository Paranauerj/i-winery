import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalWineDetailsComponent } from '../components/modal-wine-details/modal-wine-details.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
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
  userInfo;
  QRGenerated = false;

  constructor
  (
    private router: Router, 
    private wineService: WineService, 
    private authService: AuthService,
    private userService: UserService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private navController: NavController,
    private firestorage: AngularFireStorage,
    private alertController: AlertController
  ) 
  { 
    this.presentLoading();

    var wineIdParam = this.router.getCurrentNavigation().extras.state;
    this.wineId = wineIdParam ? wineIdParam : "7VbfK2SGx5pbzssL2xsa";

    wineService.userEvaluation(this.wineId).then(response => {
      response.forEach(values => {
        this.setStars(values.data()["stars"]);
        this.alreadyEvaluated = true;
        this.evaluationId = values.id;
      });
    });

    userService.getInfoFromCurrentUser().subscribe(response => {
      this.userInfo = response.data();
    });

    this.LoadWineInfo();
    this.LoadWineInteractions();
  }

  LoadWineInfo(){
    this.wineService.getInfo(this.wineId).subscribe((response) => {
      this.wineInfo = response.data();
      
      
      if(this.wineInfo.image){
        var storageRef = this.firestorage.storage.ref();
        var imgRef = storageRef.child(this.wineInfo.image);
        imgRef.getDownloadURL().then(url => {
          this.wineInfo.image = url;
        });
      } 
      else {
        this.wineInfo.image = "../../assets/appImages/wineDefaultIcon.png";
      }

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
    this.presentToast("Avaliado com sucesso!");
    
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

  deleteWine(){
      this.presentAlertConfirm();
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
      componentProps: Object.assign(this.wineInteractions[index].Record, {name: this.wineInfo.name, interactionKey: this.wineInteractions[index].Key, isAdminOrOwner: this.isOwner || this.userInfo.role == "admin" })
    });
    return await modal.present();
    // console.log(index, this.wineInteractions[index]);
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja deletar este vinho?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            this.wineService.removeWine(this.wineId).then(response => {
              this.presentToast("Vinho deletado com sucesso!");
              this.navController.navigateRoot("/main");
            });
          }
        }
      ]
    });

    await alert.present();
  }
  

}
