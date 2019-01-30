import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly api = 'http://demo0221204.mockable.io';

  constructor(private http: HttpClient) { }

  getProducts() {
    const url = `${this.api}/products`;
    return this.http.get(url);
  }
}
