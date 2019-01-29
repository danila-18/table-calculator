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
  banquetForm: FormGroup;
  banquet: IBanquet;
  banquetDishes: IBanquetDishes[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let banquetID = this.activatedRoute.snapshot.params.banquetID;

    if (Number(banquetID > 0)) {
      banquetID = Number(banquetID);
      this.banquet = this.allBanquets.find(b => b.id === banquetID);

      this.banquetDishes = <IBanquetDishes[]>this.banquetsRelations
        .filter(b => b.banquet_id === banquetID)
        .map(banquet => {
          return <IBanquetDishes>{...banquet, ...this.allDishes.find(dish => dish.dish_id === banquet.dish_id)};
        }) || [];

      this.banquetForm = new FormGroup({
        title: new FormControl(this.banquet.title),
        description: new FormControl(this.banquet.description),
        dishes: new FormArray([
          ...this.banquetDishes.map(banquetDish => new FormGroup({
            dish_id: new FormControl(banquetDish.dish_id),
            dish_count: new FormControl(banquetDish.dish_count)
          }))
        ])
      });
    } else if (banquetID === 'new') {
      this.banquetForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        dishes: new FormArray([])
      });
    }
  }

  onSaveBanquet() {

  }

  onAddDish() {
    const newDish = new FormGroup({
      dish_id: new FormControl(this.allDishes[0].dish_id),
      dish_count: new FormControl(0)
    });
    newDish.setParent(this.banquetForm);
    (<FormArray>this.banquetForm.controls['dishes']).push(newDish);
  }

  onDeleteDish(i) {
    (<FormArray>this.banquetForm.controls['dishes']).removeAt(i);
  }

}
