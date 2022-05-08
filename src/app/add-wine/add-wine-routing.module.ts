import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWinePage } from './add-wine.page';

const routes: Routes = [
  {
    path: '',
    component: AddWinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWinePageRoutingModule {}
