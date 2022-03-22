import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotMyPasswordPage } from './forgot-my-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotMyPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotMyPasswordPageRoutingModule {}
