import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-wine-details',
  templateUrl: './modal-wine-details.component.html',
  styleUrls: ['./modal-wine-details.component.scss'],
})
export class ModalWineDetailsComponent {

  @Input() name: any;
  @Input() type: any;
  @Input() date: any;
  @Input() temperature: any;
  @Input() humidity: any;
  @Input() location: any;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
