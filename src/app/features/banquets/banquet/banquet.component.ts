import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {IBanquet, IBanquetRelation} from '../banquets.component';
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

  banquetForm: FormGroup;
  banquet: IBanquet;
  dishes: IDish[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private banquetsService: BanquetsService,
              private dishService: DishService,
              private router: Router) {
  }

  ngOnInit() {
    const banquetID = this.activatedRoute.snapshot.params.banquetID;
    if (Number(banquetID > 0)) {
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
          ]),
          date: new FormControl(banquet.date)
        });
      });
    } else if (banquetID === 'new') {
      this.banquetForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        dishes: new FormArray([]),
        date: new FormControl(new Date())
      });
    }

    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
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
