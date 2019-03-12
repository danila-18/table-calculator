import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {BANQUETS_RELATIONS, BANQUETS_TABLE, IBanquet, IBanquetRelation} from '../banquets.component';
import {DishService} from '../../dishes/dish.service';
import {IDish} from '../../dishes/dishes.models';
import {BanquetsService} from '../banquets.service';

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
  banquetForm: FormGroup;
  banquet: IBanquet;
  banquetDishes: IBanquetDishes[] = [];
  dishes: IDish[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private banquetsService: BanquetsService,
              private dishService: DishService,
              private router: Router) {
  }

  ngOnInit() {
    const banquetID = this.activatedRoute.snapshot.params.banquetID;

    this.banquetsService.getBanquet(banquetID).subscribe(banquet => {
      this.banquet = banquet;
      this.banquetForm = new FormGroup({
        banquet_id: new FormControl(banquet.banquet_id),
        title: new FormControl(banquet.title),
        description: new FormControl(banquet.description),
        dishes: new FormArray([
          ...banquet.dishes.map(banquetDish => new FormGroup({
            dish_id: new FormControl(banquetDish.dish_id),
            dish_count: new FormControl(banquetDish.dish_count)
          }))
        ])
      });
    });
    this.dishService.getDishes().subscribe(
      dishes => this.dishes = dishes
    );
    /*if (Number(banquetID > 0)) {
      this.dishService.getDishes().subscribe((dishes: IDish[]) => {
        this.dishes = dishes;
        banquetID = Number(banquetID);
        this.banquet = this.allBanquets.find(b => b.banquet_id === banquetID);

        this.banquetDishes = <IBanquetDishes[]>this.banquetsRelations
          .filter(b => b.banquet_id === banquetID)
          .map(banquet => {
            return <IBanquetDishes>{...banquet, ...dishes.find(dish => dish.dish_id === banquet.dish_id)};
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
      });
    } else if (banquetID === 'new') {
      this.banquetForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        dishes: new FormArray([])
      });
    }*/
  }

  onSaveBanquet() {
    this.banquetsService.saveBanquet(this.banquetForm.value).subscribe(banquet => {
      this.router.navigateByUrl('/banquets');
    });
  }

  onAddDish() {
    const newDish = new FormGroup({
      dish_id: new FormControl(this.dishes[0].dish_id),
      dish_count: new FormControl(0)
    });
    newDish.setParent(this.banquetForm);
    (<FormArray>this.banquetForm.controls['dishes']).push(newDish);
  }

  onDeleteDish(i) {
    (<FormArray>this.banquetForm.controls['dishes']).removeAt(i);
  }

}
