import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BanquetsComponent} from './banquets.component';
import {BanquetComponent} from './banquet/banquet.component';

const routes: Routes = [
  {
    path: '',
    component: BanquetsComponent
  },
  {
    path: ':banquetID',
    component: BanquetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanquetsRoutingModule { }
