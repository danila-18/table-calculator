import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'dishes', loadChildren: 'src/app/features/dishes/dishes.module#DishesModule'
      },
      {
        path: 'banquets', loadChildren: 'src/app/features/banquets/banquets.module#BanquetsModule'
      },
      {
        path: 'products', loadChildren: 'src/app/features/products/products.module#ProductsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
