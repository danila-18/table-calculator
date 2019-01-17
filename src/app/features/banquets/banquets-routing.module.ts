import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BanquetsComponent} from './banquets.component';

const routes: Routes = [
  {
    path: '',
    component: BanquetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanquetsRoutingModule { }
