import { supabase } from '@/lib/supabase';
import { Product, ProductSummary } from '@/models/Product';

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    if (!supabase) {
      return this.getMockProducts();
    }
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getTopProducts(limit: number = 3): Promise<ProductSummary[]> {
    if (!supabase) {
      return this.getMockProducts().slice(0, limit).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity_sold: p.quantity_sold,
        image_url: p.image_url
      }));
    }
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, quantity_sold, image_url')
      .order('quantity_sold', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  private getMockProducts(): Product[] {
    return [
      { id: '1', name: 'Sudha Gold Milk', category: 'Dairy', price: 66, quantity_sold: 450, stock: 120, sales: 29700, created_at: new Date().toISOString() },
      { id: '2', name: 'Amul Butter 500g', category: 'Dairy', price: 280, quantity_sold: 120, stock: 45, sales: 33600, created_at: new Date().toISOString() },
      { id: '3', name: 'Britannia Good Day', category: 'Bakery', price: 30, quantity_sold: 800, stock: 200, sales: 24000, created_at: new Date().toISOString() },
      { id: '4', name: 'Maggi Noodles 12pk', category: 'General', price: 168, quantity_sold: 350, stock: 60, sales: 58800, created_at: new Date().toISOString() },
      { id: '5', name: 'Tata Tea Gold', category: 'General', price: 420, quantity_sold: 180, stock: 30, sales: 75600, created_at: new Date().toISOString() },
    ];
  }

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
