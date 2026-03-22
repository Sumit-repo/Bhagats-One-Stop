'use client';

import { useState, useEffect } from 'react';
import { ProductService } from '@/services/productService';
import { Product, ProductSummary } from '@/models/Product';

const productService = new ProductService();

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await productService.getAllProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters: { category?: string; stockStatus?: string; search?: string; minPrice?: number; maxPrice?: number }) => {
    let result = [...products];
    if (filters.category && filters.category !== 'all') result = result.filter(p => p.category === filters.category);
    if (filters.stockStatus && filters.stockStatus !== 'all') result = result.filter(p => filters.stockStatus === 'low' ? p.stock < 50 : p.stock >= 50);
    if (filters.minPrice !== undefined) result = result.filter(p => p.price >= filters.minPrice!);
    if (filters.maxPrice !== undefined) result = result.filter(p => p.price <= filters.maxPrice!);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    setFilteredProducts(result);
  };

  const addProduct = async (newProduct: Omit<Product, 'id' | 'created_at' | 'sales' | 'quantity_sold'>) => {
    const created = await productService.createProduct(newProduct);
    setProducts(prev => [created, ...prev]);
    setFilteredProducts(prev => [created, ...prev]);
    return created;
  };

  const updateProduct = async (updated: Product) => {
    const saved = await productService.updateProduct(updated.id, updated);
    setProducts(prev => prev.map(p => p.id === saved.id ? saved : p));
    setFilteredProducts(prev => prev.map(p => p.id === saved.id ? saved : p));
  };

  const deleteProduct = async (id: string) => {
    await productService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setFilteredProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products: filteredProducts, loading, error, refresh: loadProducts, applyFilters, addProduct, updateProduct, deleteProduct };
}
