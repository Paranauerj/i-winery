import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWinePageRoutingModule } from './add-wine-routing.module';

import { AddWinePage } from './add-wine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWinePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddWinePage]
})
export class AddWinePageModule {}
