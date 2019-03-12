import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {IProduct} from '../../products/products.models';
import {DishService} from '../dish.service';
import {IDish} from '../dishes.models';
import {ProductsService} from '../../products/products.service';
import {tap} from 'rxjs/internal/operators';
import {IDishRelation} from '../dishes.component';

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
  productsAll: IProduct[];

  constructor(private activatedRoute: ActivatedRoute,
              private dishService: DishService,
              private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    const dishID = this.activatedRoute.snapshot.params.dish_id;
    this.productsService.getProducts().subscribe(products => this.productsAll = products);
    if (Number(dishID) > 0) {
      this.dishService.getDish(dishID).subscribe(dish => {
        this.dish = dish;
        this.dishForm = new FormGroup({
          dish_id: new FormControl(this.dish.dish_id),
          title: new FormControl(this.dish.title),
          description: new FormControl(this.dish.description),
          products: new FormArray(
            this.dish.products.map(prod => {
              return new FormGroup({
                product_id: new FormControl(String(prod.product_id)),
                amount: new FormControl(prod.amount)
              });
            })
          )
        });
      });
    } else if (dishID === 'new') {
      this.dishForm = new FormGroup({
        dish_id: new FormControl(),
        title: new FormControl(),
        description: new FormControl(),
        products: new FormArray([])
      });
    }
  }

  onDeleteProduct(index: number) {
    (<FormArray>this.dishForm.controls['products']).removeAt(index);
  }

  onSave() {
    this.dishService.saveDish(this.dishForm.value).pipe(
      tap(() => {
        this.router.navigate(['/dishes']);
      })
    ).subscribe();
  }

  onAddProduct() {
    const newProduct = new FormGroup({
      product_id: new FormControl(this.productsAll[0].product_id),
      amount: new FormControl(0)
    });
    newProduct.setParent(this.dishForm);
    (<FormArray>this.dishForm.controls['products']).push(newProduct);
  }

}
