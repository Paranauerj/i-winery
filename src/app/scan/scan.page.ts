import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { WineService } from '../services/wine.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  @ViewChild("altScanVal") alternativeScanResult: ElementRef;

  QRWineID: any;
  cordovaError = false;

  constructor
  (
    private barcodeScanner: BarcodeScanner, 
    private navController: NavController, 
    private toastController: ToastController,
    private wineService: WineService
  ) 
  { 
    this.scan();
  }

  scan(){
    var scanOptions = {
      prompt: "Alinhe o QR ao centro da câmara",
      alert: "ID Encontrado!"
    };

    this.barcodeScanner.scan(scanOptions).then(barcodeData => {
      console.log("Barcode Data: ", barcodeData);
      this.QRWineID = barcodeData.text;

      this.wineService.getInfo(this.QRWineID).subscribe(response => {
        response.exists ? this.navController.navigateRoot("/history", { state: this.QRWineID }) : this.presentToast("ID do vinho inválido!");
      });
      
    }).catch(err => {
      this.cordovaError = true;
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

  /* 
    Caso não tenha Cordova
    https://blog.minhazav.dev/research/html5-qrcode#scan-using-file
  */
  scanSuccessHandler(e){
    console.log("Barcode data: " + e);
    this.QRWineID = e;

    this.wineService.getInfo(this.QRWineID).subscribe(response => {
      response.exists ? this.navController.navigateRoot("/history", { state: this.QRWineID }) : this.presentToast("ID do vinho inválido!");
    });
  }
}
