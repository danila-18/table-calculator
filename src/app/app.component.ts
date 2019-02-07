import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient) {
    this.http.get('http://tblcalcapi.plastic-planet.ru/').subscribe(data => {
      console.log(data);
    });
  }
}
