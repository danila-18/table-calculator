import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanquetsRoutingModule } from './banquets-routing.module';
import { BanquetsComponent } from './banquets.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import { BanquetComponent } from './banquet/banquet.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BanquetsComponent, BanquetComponent],
  imports: [
    CommonModule,
    BanquetsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class BanquetsModule { }
