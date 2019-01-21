import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IProduct, PRODUCT_DATA} from '../../products/products.component';
import {DISH_RELATION, DISH_TITLES, IDish, IDishRelation} from '../dishes.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

interface IDishProduct extends IDish, IProduct, IDishRelation {
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  products: IDishProduct[] = [];
  dish: IDishRelation;
  dishForm: FormArray;
  productsAll: IProduct[] = PRODUCT_DATA;
  dishTitles = DISH_TITLES;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const dishID = this.activatedRoute.snapshot.params.dish_id;
    this.products = <IDishProduct[]>DISH_RELATION
      .filter(dish => dish.dish_id === dishID)
      .map(dish =>
        (<IDishProduct>{
          ...this.productsAll.find(prod => prod.id === dish.product_id),
          ...dish,
          ...this.dishTitles.find(d => d.dish_id === dish.id)
        }));
    this.dish = DISH_RELATION.find(dish => dish.id === dishID);
    this.dishForm = new FormArray(
      this.products.map(prod => {
        return new FormGroup({
          product_id: new FormControl(prod.id),
          amount: new FormControl(prod.amount)
        });
      })
    );
  }

}
