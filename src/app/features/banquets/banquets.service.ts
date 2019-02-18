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
}
