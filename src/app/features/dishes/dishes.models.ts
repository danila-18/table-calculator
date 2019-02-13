import {IProduct} from '../products/products.models';

export interface IDish {
  dish_id: number;
  title: string;
  description: string;
}

export interface IDishFull extends IDish {
  products: IProduct[];
}
