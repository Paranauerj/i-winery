import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  QRWineID: any;

  constructor
  (
    private barcodeScanner: BarcodeScanner, 
    private navController: NavController, 
    private toastController: ToastController
  ) 
  { 
    this.scan();
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Barcode Data: ", barcodeData);
      this.QRWineID = barcodeData.text;

      let wineId = Number(barcodeData.text);
      if(!Number.isInteger(wineId) || wineId < 1){
        this.presentToast("ID do vinho inválido!");
      }
      else{
        this.navController.navigateRoot("/history", { state: this.QRWineID });
      }
      
    }).catch(err => {
      console.log("Error: ", err);
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
