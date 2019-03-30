import { Component, OnInit } from '@angular/core';
import {BanquetsService} from './banquets.service';

export interface IBanquet {
  banquet_id: number;
  title: string;
  date: string;
  description: string;
  price: number;
}

export interface IBanquetRelation {
  id: number;
  banquet_id: number;
  dish_id: number;
  dish_count: number;
}

@Component({
  selector: 'app-banquets',
  templateUrl: './banquets.component.html',
  styleUrls: ['./banquets.component.scss']
})
export class BanquetsComponent implements OnInit {

  banquets: IBanquet[] = [];
  columns = [
    {
      colName: 'title',
      colTitle: 'Название'
    },
    {
      colName: 'date',
      colTitle: 'Дата'
    },
    {
      colName: 'description',
      colTitle: 'Описание'
    },
    {
      colName: 'price',
      colTitle: 'Общая цена'
    }
  ];
  colNames = [...this.columns.map(col => col.colName), 'delete'];

  constructor(private banquetsService: BanquetsService) {
  }

  ngOnInit() {
    this.banquetsService.getBanquets().subscribe(banquets => this.banquets = banquets);
  }

}
