export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity_sold: number;
  stock: number;
  image_url?: string;
  created_at: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  quantity_sold: number;
  image_url?: string;
}
