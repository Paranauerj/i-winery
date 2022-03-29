import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  data;

  constructor(private barcodeScanner: BarcodeScanner) { 
    this.scan();
  }

  scan(){
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Barcode Data: ", barcodeData);
      this.data = barcodeData;
    }).catch(err => {
      console.log("Error: ", err);
    })
  }

  ngOnInit() {
  }

}
