import { supabase } from '@/lib/supabase';
import { DashboardStats, SalesData, CategorySales } from '@/models/Dashboard';
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_CUSTOMERS } from '@/lib/mockData';

export class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    if (!supabase) {
      const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + order.price, 0);
      const totalOrders = MOCK_ORDERS.length;
      const totalProducts = MOCK_PRODUCTS.length;
      const activeCustomers = MOCK_CUSTOMERS.length;

      return {
        total_revenue: totalRevenue,
        revenue_change: 12.5,
        total_orders: totalOrders,
        orders_change: 8.2,
        total_products: totalProducts,
        products_change: -2.4,
        active_customers: activeCustomers,
        customers_change: 15.3,
      };
    }

    const [ordersData, productsData, customersData] = await Promise.all([
      supabase.from('orders').select('price'),
      supabase.from('products').select('id'),
      supabase.from('customers').select('id'),
    ]);

    const totalRevenue = ordersData.data?.reduce((sum: number, order: any) => sum + Number(order.price), 0) || 0;
    const totalOrders = ordersData.data?.length || 0;
    const totalProducts = productsData.data?.length || 0;
    const activeCustomers = customersData.data?.length || 0;

    return {
      total_revenue: totalRevenue,
      revenue_change: 18.2,
      total_orders: totalOrders,
      orders_change: 12.5,
      total_products: totalProducts,
      products_change: -2.3,
      active_customers: activeCustomers,
      customers_change: 24.6,
    };
  }

  async getSalesData(): Promise<SalesData[]> {
    return [
      { day: 'MON', amount: 4200 },
      { day: 'TUE', amount: 4600 },
      { day: 'WED', amount: 4400 },
      { day: 'THU', amount: 4700 },
      { day: 'FRI', amount: 6645.80 },
      { day: 'SAT', amount: 5200 },
      { day: 'SUN', amount: 5800 },
    ];
  }

  async getCategorySales(): Promise<CategorySales[]> {
    if (!supabase) {
      const categoryMap = new Map<string, number>();
      MOCK_PRODUCTS.forEach((product) => {
        const category = product.category;
        const sales = product.price * product.quantity_sold;
        categoryMap.set(category, (categoryMap.get(category) || 0) + sales);
      });
      const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0);
      return Array.from(categoryMap.entries()).map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      }));
    }
    const { data } = await supabase
      .from('products')
      .select('category, price, quantity_sold');

    const categoryMap = new Map<string, number>();

    data?.forEach((product: any) => {
      const category = product.category;
      const sales = Number(product.price) * product.quantity_sold;
      categoryMap.set(category, (categoryMap.get(category) || 0) + sales);
    });

    const total = Array.from(categoryMap.values()).reduce((sum: number, val: number) => sum + val, 0);

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }));
  }
}
