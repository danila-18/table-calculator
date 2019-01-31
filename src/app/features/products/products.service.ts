import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from './products.models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly api = 'http://demo0221204.mockable.io';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    const url = `${this.api}/products`;
    return this.http.get(url).pipe(
      map(products => <IProduct[]>products)
    );
  }
}
