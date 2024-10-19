export type Product = {
  id: string;
  name: string;
  description: string;
  amount_type: "grams" | "kilos" | "liters" | "unit";
  amount: number;
  photo?: string;
};
