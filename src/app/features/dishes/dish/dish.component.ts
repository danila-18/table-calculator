import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DISH_RELATIONS, IDishRelation} from '../dishes.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {IProduct} from '../../products/products.models';
import {DishService} from '../dish.service';
import {IDish} from '../dishes.models';
import {ProductsService} from '../../products/products.service';
import {tap} from 'rxjs/internal/operators';

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

  constructor(private activatedRoute: ActivatedRoute,
              private dishService: DishService,
              private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    const dishID = this.activatedRoute.snapshot.params.dish_id;
    if (Number(dishID) > 0) {
      this.dishService.getDish(dishID).subscribe(a => {
        console.log(a);
      });
      this.dishService.getDishes().subscribe((dishes: IDish[]) => { // TODO: Refactoring
        this.productsService.getProducts().subscribe((products: IProduct[]) => {
          this.productsAll = products;
          this.dish = dishes.find(dish => dish.dish_id === dishID);
          this.products = <IDishProduct[]>this.dishRelations
            .filter(d => d.dish_id === +dishID) // Attention! dishRelation has number type dish_id
            .map(d => {
              return <IDishProduct>{...d, ...this.productsAll.find(p => p.product_id === d.dish_id)};
            });
          this.dishForm = new FormGroup({
            dish_id: new FormControl(this.dish.dish_id),
            title: new FormControl(this.dish.title),
            description: new FormControl(this.dish.description),
            dishes: new FormArray(
              this.products.map(prod => {
                return new FormGroup({
                  product_id: new FormControl(String(prod.product_id)),
                  amount: new FormControl(prod.amount)
                });
              })
            )
          });
        });
      });
    } else if (dishID === 'new') {
      this.dishForm = new FormGroup({
        dish_id: new FormControl(),
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
    console.log(this.dishForm.value);
    this.dishService.saveDish(this.dishForm.value).pipe(
      tap(() => {
        console.log('asdf');
        this.router.navigate(['/dishes']);
      })
    ).subscribe();
  }

  onCancel() {

  }

  onAddProduct() {
    const newProduct = new FormGroup({
      product_id: new FormControl(this.productsAll[0].product_id),
      amount: new FormControl(0)
    });
    newProduct.setParent(this.dishForm);
    (<FormArray>this.dishForm.controls['dishes']).push(newProduct);
  }

}
