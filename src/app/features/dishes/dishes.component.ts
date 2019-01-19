import { Component, OnInit } from '@angular/core';
import {IProduct, PRODUCT_DATA} from '../products/products.component';

export const DISH_TITLES: IDish[] = [
  {dish_id: 1, title: 'Оливье', description: 'Блюдо из майонеза'},
  {dish_id: 2, title: 'Оливье1', description: 'Блюдо из майонеза5'},
  {dish_id: 3, title: 'Оливье2', description: 'Блюдо из майонеза6'},
  {dish_id: 4, title: 'Оливье3', description: 'Блюдо из майонеза7'},
  {dish_id: 5, title: 'Оливье4', description: 'Блюдо из майонеза8'}
];

export interface IDish {
  dish_id: number;
  title: string;
  description: string;
}

export interface IColumn {
  colName: string;
  colTitle: string;
}

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  tableData: IDish[] = [];
  columns = [
    {
      colName: 'title',
      colTitle: 'Наименование'
    },
    {
      colName: 'description',
      colTitle: 'Описание'
    }
  ];
  colNames = [...this.columns.map(col => col.colName), 'delete'];

  constructor() { }

  ngOnInit() {
    this.tableData = DISH_TITLES;
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
