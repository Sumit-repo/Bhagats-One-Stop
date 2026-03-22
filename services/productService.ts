import { Product, ProductSummary } from '@/models/Product';

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data;
  }

  async getTopProducts(limit: number = 3): Promise<ProductSummary[]> {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error(await res.text());
    const data: Product[] = await res.json();
    return data
      .sort((a, b) => (b.quantity_sold || 0) - (a.quantity_sold || 0))
      .slice(0, limit)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity_sold: p.quantity_sold,
        image_url: p.image_url
      }));
  }

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'sales' | 'quantity_sold'>): Promise<Product> {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
  }
}
