import {IDish} from '../dishes/dishes.models';

export interface IBanquet {
  banquet_id: number;
  title: string;
  description: string;
  date: string;
  price: number;
  dishes?: {
    dish_id: number;
    dish_count: number;
  }[];
}
