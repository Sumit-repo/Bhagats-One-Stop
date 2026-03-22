export interface DashboardStats {
  total_revenue: number;
  revenue_change: number;
  total_orders: number;
  orders_change: number;
  total_products: number;
  products_change: number;
  active_customers: number;
  customers_change: number;
}

export interface SalesData {
  day: string;
  amount: number;
}

export interface CategorySales {
  category: string;
  amount: number;
  percentage: number;
}
