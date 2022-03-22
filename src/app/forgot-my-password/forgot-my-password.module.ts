import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotMyPasswordPageRoutingModule } from './forgot-my-password-routing.module';

import { ForgotMyPasswordPage } from './forgot-my-password.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotMyPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotMyPasswordPage]
})
export class ForgotMyPasswordPageModule {}
