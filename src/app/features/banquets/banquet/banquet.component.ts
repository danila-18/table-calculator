import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {BANQUETS_RELATIONS, BANQUETS_TABLE, IBanquet, IBanquetRelation} from '../banquets.component';
import {DISH_RELATIONS, DISH_TITLES, IDish} from '../../dishes/dishes.component';

export interface IBanquetDishes extends IDish, IBanquetRelation {
}


@Component({
  selector: 'app-banquet',
  templateUrl: './banquet.component.html',
  styleUrls: ['./banquet.component.scss']
})
export class BanquetComponent implements OnInit {

  allBanquets = BANQUETS_TABLE;
  banquetsRelations = BANQUETS_RELATIONS;
  allDishes = DISH_TITLES;
  bFrom: FormGroup;
  banquet: IBanquet;
  banquetDishes: IBanquetDishes[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params.banquetID);
    const banquetID = Number(this.activatedRoute.snapshot.params.banquetID);
    this.banquet = this.allBanquets.find(b => b.id === banquetID);

    this.banquetDishes = <IBanquetDishes[]>this.banquetsRelations
      .filter(b => b.banquet_id === banquetID)
      .map(banquet => {
        return <IBanquetDishes>{...banquet, ...this.allDishes.find(dish => dish.dish_id === banquet.dish_id)};
      }) || [];

    this.bFrom = new FormGroup({
      title: new FormControl(this.banquet.title),
      description: new FormControl(this.banquet.description),
      dishes: new FormArray([
        ...this.banquetDishes.map(banquetDish => new FormGroup({
          dish_id: new FormControl(banquetDish.dish_id),
          dish_count: new FormControl(banquetDish.dish_count)
        }))
      ])
    });
  }

  onSaveBanquet() {

  }

}
