import { Component, OnInit } from '@angular/core';
import {IColumn} from '../dishes/dishes.component';

export interface IProduct {
  product_id: number;
  name: string;
  price: number;
  weight: number;
}

export const PRODUCT_DATA: IProduct[] = [
  {product_id: 1, price: 1, name: 'Hydrogen', weight: 1.0079},
  {product_id: 2, price: 2, name: 'Helium', weight: 4.0026},
  {product_id: 3, price: 3, name: 'Lithium', weight: 6.941},
  {product_id: 4, price: 4, name: 'Beryllium', weight: 9.0122},
  {product_id: 5, price: 5, name: 'Boron', weight: 10.811},
  {product_id: 6, price: 6, name: 'Carbon', weight: 12.0107},
  {product_id: 7, price: 7, name: 'Nitrogen', weight: 14.0067},
  {product_id: 8, price: 8, name: 'Oxygen', weight: 15.9994},
  {product_id: 9, price: 9, name: 'Fluorine', weight: 18.9984},
  {product_id: 10, price: 10, name: 'Neon', weight: 20.1797},
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  tableData: IProduct[] = [];
  columns: IColumn[] = [
    {
      colName: 'price',
      colTitle: 'Цена'
    },
    {
      colName: 'name',
      colTitle: 'Наименование'
    },
    {
      colName: 'weight',
      colTitle: 'Вес (Кол-во)'
    }
  ];
  colNames = [...this.columns.map(col => col.colName), 'delete'];

  constructor() { }

  ngOnInit() {
    this.tableData = PRODUCT_DATA;
  }

  addProduct() {

  }

  productClick(row) {
    console.log(row);
  }

  deleteProduct(element, event: Event) {
    event.stopPropagation();
    console.log(element);
  }

}
