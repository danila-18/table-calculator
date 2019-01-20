import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishesComponent } from './dishes.component';
import {MatButtonModule, MatIconModule, MatTableModule} from '@angular/material';
import { DishComponent } from './dish/dish.component';

@NgModule({
  declarations: [DishesComponent, DishComponent],
  imports: [
    CommonModule,
    DishesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DishesModule { }
