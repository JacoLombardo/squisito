export interface Product {
  internal_id: number;
  name: string;
  description: string[];
  color: string;
  price: number;
  image: string;
  type: string;
  tags: string[];
}

export interface CartItem {
  number: number;
  item: Product;
}
