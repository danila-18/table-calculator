import {Component, OnInit} from '@angular/core';
import {DishService} from './dish.service';
import {IDish} from './dishes.models';
import {tap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

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

  dishes: IDish[] = [];
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

  constructor(private dishService: DishService,
              private router: Router) {
  }

  ngOnInit() {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

  deleteDish(dish_id: number, event: Event) {
    event.stopPropagation();
    this.dishService.deleteDish(dish_id).pipe(
      tap(dishes => this.dishes = dishes)
    ).subscribe();
  }

  addDish() {
    this.dishService.addDish().pipe(
      tap((dish: IDish) => this.router.navigate(['/dishes', dish.dish_id]))
    ).subscribe();
  }

}
