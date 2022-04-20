import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInteractionPage } from './add-interaction.page';

const routes: Routes = [
  {
    path: '',
    component: AddInteractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInteractionPageRoutingModule {}
