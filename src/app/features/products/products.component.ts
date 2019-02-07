import {Component, OnInit, ViewChild} from '@angular/core';
import {IColumn} from '../dishes/dishes.component';
import {AddProductDialogComponent} from './add-product-dialog/add-product-dialog.component';
import {MatDialog, MatTable} from '@angular/material';
import {ProductsService} from './products.service';
import {IProduct} from './products.models';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';

export const PRODUCT_DATA: IProduct[] = [
  {product_id: 1, price: 1, title: 'Hydrogen', weight: 1.0079},
  {product_id: 2, price: 2, title: 'Helium', weight: 4.0026},
  {product_id: 3, price: 3, title: 'Lithium', weight: 6.941},
  {product_id: 4, price: 4, title: 'Beryllium', weight: 9.0122},
  {product_id: 5, price: 5, title: 'Boron', weight: 10.811},
  {product_id: 6, price: 6, title: 'Carbon', weight: 12.0107},
  {product_id: 7, price: 7, title: 'Nitrogen', weight: 14.0067},
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<IProduct[]>;
  tableData: IProduct[] = [];
  columns: IColumn[] = [
    {
      colName: 'price',
      colTitle: 'Цена'
    },
    {
      colName: 'title',
      colTitle: 'Наименование'
    },
    {
      colName: 'weight',
      colTitle: 'Вес (Кол-во)'
    }
  ];
  colNames = [...this.columns.map(col => col.colName), 'delete'];
  @ViewChild('table') table: MatTable<IProduct>;

  constructor(public dialog: MatDialog, private productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe((addedProduct: IProduct) => {
      if (addedProduct) {
        this.tableData.push({...addedProduct, product_id: Math.random() * 1000000}); // TODO: product_id generate
        this.table.renderRows();
      }
    });
  }

  productClick(data: IProduct) {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {data});
    dialogRef.afterClosed().subscribe((changedProduct: IProduct) => {
      this.productsService.updateProduct(changedProduct).pipe(
        tap(product => {
          if (product) {
            this.tableData.splice(
              this.tableData.findIndex(prod => prod.product_id === product.product_id), 1, product
            );
            this.table.renderRows();
          }
        })
      ).subscribe();
    });
  }

  deleteProduct(element: IProduct, event: Event) {
    event.stopPropagation();
    this.tableData.splice(this.tableData.findIndex(prod => prod.product_id === element.product_id), 1);
    this.table.renderRows();
  }

}
