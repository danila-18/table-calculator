import { Component, OnInit } from '@angular/core';
import {BanquetsService} from './banquets.service';

export interface IBanquet {
  id: number;
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

export const BANQUETS_TABLE: IBanquet[] = [
  {id: 1, date: '12-12-2012', description: 'Застолье всех местных22', price: 3500, title: 'Название для застолья'},
  {id: 2, date: '12-12-2012', description: 'Застолье всех местных2', price: 2512, title: 'Название для застолья'},
  {id: 3, date: '12-12-2012', description: 'Застолье всех местных3', price: 4545, title: 'Название для застолья'},
  {id: 4, date: '12-12-2012', description: 'Застолье всех местных4', price: 9045, title: 'Название для застолья'},
  {id: 5, date: '12-12-2012', description: 'Застолье всех местных55', price: 3290, title: 'Название для застолья'},
];

export const BANQUETS_RELATIONS: IBanquetRelation[] = [
  {id: 1, banquet_id: 1, dish_id: 1, dish_count: 4},
  {id: 2, banquet_id: 1, dish_id: 2, dish_count: 1},
  {id: 3, banquet_id: 1, dish_id: 3, dish_count: 3},
  {id: 4, banquet_id: 2, dish_id: 5, dish_count: 6},
  {id: 5, banquet_id: 2, dish_id: 3, dish_count: 4},
];

@Component({
  selector: 'app-banquets',
  templateUrl: './banquets.component.html',
  styleUrls: ['./banquets.component.scss']
})
export class BanquetsComponent implements OnInit {

  tableData: IBanquet[] = [];
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
    this.tableData = BANQUETS_TABLE;
    this.banquetsService.getBanquets().subscribe(banquets => this.banquets = banquets);
  }

}
