import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IProduct, PRODUCT_DATA} from '../../products/products.component';
import {DISH_RELATIONS, DISH_TITLES, IDish, IDishRelation} from '../dishes.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

interface IDishProduct extends IProduct, IDishRelation {
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  products: IDishProduct[] = [];
  dish: IDish;
  dishForm: FormGroup;
  productsAll: IProduct[] = PRODUCT_DATA;
  dishRelations = DISH_RELATIONS;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const dishID = +this.activatedRoute.snapshot.params.dish_id;
    this.dish = DISH_TITLES.find(dish => dish.dish_id === dishID);
    this.products = <IDishProduct[]>this.dishRelations
      .filter(d => d.dish_id === dishID)
      .map(d => {
        return <IDishProduct>{...d, ...this.productsAll.find(p => p.id === d.product_id)};
      });

    this.dishForm = new FormGroup({
      title: new FormControl(this.dish.title),
      description: new FormControl(this.dish.description),
      dishes: new FormArray(
        this.products.map(prod => {
          return new FormGroup({
            product_id: new FormControl(prod.product_id),
            amount: new FormControl(prod.amount)
          });
        })
      )
    });
  }

  onSave() {

  }

  onCancel() {

  }

  onAddProduct() {
    const newProduct = new FormGroup({
      product_id: new FormControl(),
      amount: new FormControl()
    });
    newProduct.setParent(this.dishForm);
    (<FormArray>this.dishForm.controls['dishes']).push(newProduct);
  }

}
