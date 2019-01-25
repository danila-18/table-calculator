import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {BANQUETS_RELATIONS, BANQUETS_TABLE, IBanquet} from '../banquets.component';
import {DISH_RELATIONS, DISH_TITLES} from '../../dishes/dishes.component';

export const BANQUETS = [

];

@Component({
  selector: 'app-banquet',
  templateUrl: './banquet.component.html',
  styleUrls: ['./banquet.component.scss']
})
export class BanquetComponent implements OnInit {

  bFrom: FormGroup;
  allBanquets = BANQUETS_TABLE;
  banquetsRelations = BANQUETS_RELATIONS;
  banquet: IBanquet;
  allDishes = DISH_TITLES;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params.banquetID);
    const banquetID = Number(this.activatedRoute.snapshot.params.banquetID);
    this.banquet = this.allBanquets.find(b => b.id === banquetID);

    this.bFrom = new FormGroup({
      title: new FormControl(this.banquet.title),
      description: new FormControl(this.banquet.description),
      dishes: new FormArray([
        new FormGroup({
          banquet_id: new FormControl(1),
          count: new FormControl(1)
        })
      ])
    });
  }

  onSaveBanquet() {

  }

}
