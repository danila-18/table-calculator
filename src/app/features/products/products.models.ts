export interface IProduct {
  product_id: number;
  title: string;
  price: number;
  weight: number;
}

export interface IDishProduct extends IProduct {
  amount: number;
}
