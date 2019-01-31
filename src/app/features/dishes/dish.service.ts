import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {IDish} from './dishes.models';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private readonly api = 'http://demo0221204.mockable.io';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<IDish[]> {
    const url = `${this.api}/dishes`;
    return this.http.get(url).pipe(
      map(dishes => <IDish[]>dishes)
    );
  }
}
