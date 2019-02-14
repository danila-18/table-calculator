import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {IDish} from './dishes.models';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private readonly api = 'http://tblcalcapi.plastic-planet.ru';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<IDish[]> {
    const url = `${this.api}/dishes.php`;
    return this.http.get(url).pipe(
      map(dishes => <IDish[]>dishes)
    );
  }

  saveDish(dish: IDish): Observable<IDish> {
    const url = `${this.api}/dish_relation.php?action=update`;
    return this.http.post(url, dish).pipe(
      map(dishes => <IDish>dishes)
    );
  }

  getDish(dish_id: number): Observable<IDish> {
    const url = `${this.api}/dish_relation.php?action=get&dish_id=${dish_id}`;
    return this.http.get(url).pipe(
      map(dishe => <IDish>dishe)
    );
  }
}
