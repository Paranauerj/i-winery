import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInteractionPageRoutingModule } from './add-interaction-routing.module';

import { AddInteractionPage } from './add-interaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInteractionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddInteractionPage]
})
export class AddInteractionPageModule {}
