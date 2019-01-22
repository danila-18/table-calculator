import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishesComponent } from './dishes.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import { DishComponent } from './dish/dish.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DishesComponent, DishComponent],
  imports: [
    CommonModule,
    DishesRoutingModule,
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
export class DishesModule { }
