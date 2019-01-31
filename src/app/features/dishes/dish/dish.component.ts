import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DISH_RELATIONS, IDishRelation} from '../dishes.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {IProduct} from '../../products/products.models';
import {DishService} from '../dish.service';
import {IDish} from '../dishes.models';
import {ProductsService} from '../../products/products.service';

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
  productsAll: IProduct[] = [];
  dishRelations = DISH_RELATIONS;

  constructor(private activatedRoute: ActivatedRoute, private dishService: DishService, private productsService: ProductsService) {
  }

  ngOnInit() {
    const dishID = this.activatedRoute.snapshot.params.dish_id;
    if (Number(dishID) > 0) {
      this.dishService.getDishes().subscribe((dishes: IDish[]) => { // TODO: Refactoring
        this.productsService.getProducts().subscribe((products: IProduct[]) => {
          this.productsAll = products;
          this.dish = dishes.find(dish => dish.dish_id === dishID);
          this.products = <IDishProduct[]>this.dishRelations
            .filter(d => d.dish_id === +dishID) // Attention! dishRelation has number type dish_id
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
          debugger;
        });
      });
    } else if (dishID === 'new') {
      this.dishForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        dishes: new FormArray([])
      });
    }
  }

  onDeleteProduct(index: number) {
    (<FormArray>this.dishForm.controls['dishes']).removeAt(index);
  }

  onSave() {

  }

  onCancel() {

  }

  onAddProduct() {
    const newProduct = new FormGroup({
      product_id: new FormControl(this.productsAll[0].id),
      amount: new FormControl(0)
    });
    newProduct.setParent(this.dishForm);
    (<FormArray>this.dishForm.controls['dishes']).push(newProduct);
  }

}
