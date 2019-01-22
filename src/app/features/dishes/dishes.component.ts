import {Component, OnInit} from '@angular/core';

export const DISH_TITLES: IDish[] = [
  {dish_id: 1, title: 'Оливье', description: 'Блюдо из майонеза'},
  {dish_id: 2, title: 'Оливье1', description: 'Блюдо из майонеза5'},
  {dish_id: 3, title: 'Оливье2', description: 'Блюдо из майонеза6'},
  {dish_id: 4, title: 'Оливье3', description: 'Блюдо из майонеза7'},
  {dish_id: 5, title: 'Оливье4', description: 'Блюдо из майонеза8'}
];

export const DISH_RELATIONS: IDishRelation[] = [
  {id: 1, dish_id: 1, product_id: 1, amount: 0.5},
  {id: 2, dish_id: 1, product_id: 2, amount: 0.2},
  {id: 3, dish_id: 1, product_id: 3, amount: 1.3},
  {id: 4, dish_id: 2, product_id: 4, amount: 4.3},
  {id: 5, dish_id: 2, product_id: 2, amount: 2.5},
  {id: 6, dish_id: 3, product_id: 3, amount: 0.8},
  {id: 7, dish_id: 3, product_id: 2, amount: 0.9},
  {id: 8, dish_id: 3, product_id: 5, amount: 3.1}
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

export interface IDishRelation {
  id: number;
  dish_id: number;
  product_id: number;
  amount: number;
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

  constructor() {
  }

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
