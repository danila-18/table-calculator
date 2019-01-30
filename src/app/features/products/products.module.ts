import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatTableModule} from '@angular/material';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ProductsComponent, AddProductDialogComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents: [
    AddProductDialogComponent
  ]
})
export class ProductsModule { }
