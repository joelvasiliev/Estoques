export type Order = {
  id: string;
  product_id: string;
  user_id: string;
  status: string;
  payment_type: string;
  amount: Number;
  delivered: boolean;
  courier_id?: string;
  created_at: Date;
};
