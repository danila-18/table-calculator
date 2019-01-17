import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanquetsRoutingModule } from './banquets-routing.module';
import { BanquetsComponent } from './banquets.component';

@NgModule({
  declarations: [BanquetsComponent],
  imports: [
    CommonModule,
    BanquetsRoutingModule
  ]
})
export class BanquetsModule { }
