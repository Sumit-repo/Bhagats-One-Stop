import { DashboardStats, SalesData, CategorySales } from '@/models/Dashboard';

export class DashboardService {
  async getDashboardStats(days: number = 30, customRange?: { start: string; end: string }): Promise<DashboardStats> {
    const [ordersRes, productsRes, customersRes] = await Promise.all([
      fetch('/api/orders'),
      fetch('/api/products'),
      fetch('/api/customers'),
    ]);

    const allOrders: any[] = ordersRes.ok ? await ordersRes.json() : [];
    const products: any[] = productsRes.ok ? await productsRes.json() : [];
    const customers: any[] = customersRes.ok ? await customersRes.json() : [];

    let orders: any[] = [];
    let prevOrders: any[] = [];

    if (customRange && customRange.start && customRange.end) {
      const start = new Date(customRange.start).getTime();
      const end = new Date(customRange.end);
      end.setHours(23, 59, 59, 999);
      const endMs = end.getTime();
      const periodMs = endMs - start;

      orders = allOrders.filter(o => {
        const t = new Date(o.order_date).getTime();
        return t >= start && t <= endMs;
      });
      prevOrders = allOrders.filter(o => {
        const t = new Date(o.order_date).getTime();
        return t >= start - periodMs && t < start;
      });
    } else {
      const now = Date.now();
      const cutoffMs = now - days * 86400000;
      const prevCutoffMs = cutoffMs - days * 86400000;

      orders = allOrders.filter(o => new Date(o.order_date).getTime() >= cutoffMs);
      prevOrders = allOrders.filter(o => {
        const t = new Date(o.order_date).getTime();
        return t >= prevCutoffMs && t < cutoffMs;
      });
    }

    const pct = (curr: number, prev: number) =>
      prev > 0 ? Math.round(((curr - prev) / prev) * 100 * 10) / 10 : 0;

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.price), 0);
    const prevRevenue = prevOrders.reduce((sum, o) => sum + Number(o.price), 0);

    return {
      total_revenue: totalRevenue,
      revenue_change: pct(totalRevenue, prevRevenue),
      total_orders: orders.length,
      orders_change: pct(orders.length, prevOrders.length),
      total_products: products.length,
      products_change: 0,
      active_customers: customers.length,
      customers_change: 0,
    };
  }

  async getSalesData(days: number = 30, customRange?: { start: string; end: string }): Promise<SalesData[]> {
    const res = await fetch('/api/orders');
    const orders: any[] = res.ok ? await res.json() : [];

    let actualDays = days;
    let endDate = new Date();

    if (customRange && customRange.start && customRange.end) {
      const e = new Date(customRange.end);
      const s = new Date(customRange.start);
      const diffTime = Math.abs(e.getTime() - s.getTime());
      actualDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      endDate = e;
    }
    
    // Create an array of all days in the range
    const result: SalesData[] = [];
    
    for (let i = actualDays - 1; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const daySales = orders
        .filter(o => o.order_date.startsWith(dateStr))
        .reduce((sum, o) => sum + Number(o.price), 0);

      // format day label
      let dayLabel = '';
      if (actualDays <= 7) {
        dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      } else {
        dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }

      result.push({
        day: dayLabel,
        amount: daySales
      });
    }

    return result;
  }

  async getCategorySales(days: number = 30, customRange?: { start: string; end: string }): Promise<CategorySales[]> {
    // Note: To be fully accurate we would only sum sales for orders within timeframe.
    // For now we aggregate products just like before, but this returns live data
    const res = await fetch('/api/products');
    if (!res.ok) return [];
    const products: any[] = await res.json();

    const categoryMap = new Map<string, number>();
    products.forEach((product) => {
      const category = product.category;
      const sales = Number(product.price) * (product.quantity_sold || 0);
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
