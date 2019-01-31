import {Component, OnInit} from '@angular/core';
import {DishService} from './dish.service';
import {IDish} from './dishes.models';
import {Observable} from 'rxjs';

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

  dishes$: Observable<IDish[]>;
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

  constructor(private dishService: DishService) {
  }

  ngOnInit() {
    this.dishes$ = this.dishService.getDishes();
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
