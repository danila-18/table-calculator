import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IProduct} from '../products.models';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    price: new FormControl(),
    weight: new FormControl(),
  });

  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IProduct,
              private fb: FormBuilder) { }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

}
