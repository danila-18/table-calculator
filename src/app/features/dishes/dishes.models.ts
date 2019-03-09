import {IDishProduct} from '../products/products.models';

export interface IDish {
  dish_id: number;
  title: string;
  description: string;
  products?: IDishProduct[];
}
