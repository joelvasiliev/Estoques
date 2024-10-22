import { Amount } from "./amount.dto";
import { Order } from "./order.dto";

export type Product = {
  id: string;
  name: string;
  description: string;
  amount_type: Amount;
  total_cost: number;
  amount: number;
  photo?: string;
  price_per_unit: Number;
  price_per: Amount;
  orders: Order[];
};
