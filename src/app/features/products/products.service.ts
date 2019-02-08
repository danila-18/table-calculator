import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from './products.models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly api = 'http://tblcalcapi.plastic-planet.ru';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    const url = `${this.api}/products.php`;
    return this.http.get(url).pipe(
      map(products => <IProduct[]>products)
    );
  }

  updateProduct(changedProduct: IProduct): Observable<IProduct> { // TODO: GET params!
    const url = `${this.api}/product.php?action=update&product_id=${changedProduct.product_id}`;
    return this.http.post(url, changedProduct).pipe(
      map(product => <IProduct>product)
    );
  }

  addProduct(addedProduct: IProduct): Observable<IProduct> {
    const url = `${this.api}/product.php?action=add`;
    return this.http.post(url, addedProduct).pipe(
      map(product => <IProduct>product)
    );
  }

  deleteProduct(product_id: number): Observable<boolean> {
    const url = `${this.api}/product.php?action=delete&product_id=${product_id}`;
    return this.http.get(url).pipe(
      map(result => <boolean>result)
    );
  }
}
