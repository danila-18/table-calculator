import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  opened = true;

  menu = [
    {
      title: 'Продукты',
      route: '/products'
    },
    {
      title: 'Блюда',
      route: '/dishes'
    },
    {
      title: 'Банкеты',
      route: '/banquets'
    }
  ];

  ngOnInit() {
  }

}
