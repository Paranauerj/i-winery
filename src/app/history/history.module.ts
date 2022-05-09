import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { ModalWineDetailsComponent } from '../components/modal-wine-details/modal-wine-details.component';
import { QRCodeModule } from 'angular2-qrcode';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    QRCodeModule,
    NgxPrintModule
  ],
  declarations: [HistoryPage, ModalWineDetailsComponent],
  // exports: [ ModalWineDetailsComponent]
})
export class HistoryPageModule {}
