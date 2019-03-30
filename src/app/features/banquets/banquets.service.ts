import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBanquet} from './banquets.model';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class BanquetsService {

  private readonly api = 'http://tblcalcapi.plastic-planet.ru';

  constructor(private http: HttpClient) { }

  getBanquets(): Observable<IBanquet[]> {
    const url = `${this.api}/banquets.php`;
    return this.http.get(url).pipe(
      map(banquets => <IBanquet[]>banquets)
    );
  }

  getBanquet(banquet_id: number): Observable<IBanquet> {
    const url = `${this.api}/banquets_relation.php?action=get&banquet_id=${banquet_id}`;
    return this.http.get(url).pipe(
      map(banquet => <IBanquet>banquet)
    );
  }

  saveBanquet(banquetValue: IBanquet): Observable<IBanquet> {
    const params = banquetValue.banquet_id ? `action=update&banquet_id=${banquetValue.banquet_id}` : `action=add`;
    const url = `${this.api}/banquets_relation.php?${params}`;
    return this.http.post(url, banquetValue).pipe(
      map(banquet => <IBanquet>banquet)
    );
  }
}
