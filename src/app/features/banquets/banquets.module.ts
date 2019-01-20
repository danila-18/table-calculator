import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanquetsRoutingModule } from './banquets-routing.module';
import { BanquetsComponent } from './banquets.component';
import {MatButtonModule, MatIconModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [BanquetsComponent],
  imports: [
    CommonModule,
    BanquetsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BanquetsModule { }
