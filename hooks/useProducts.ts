'use client';

import { useState, useEffect } from 'react';
import { ProductService } from '@/services/productService';
import { Product, ProductSummary } from '@/models/Product';

const productService = new ProductService();

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [allProducts, top] = await Promise.all([
        productService.getAllProducts(),
        productService.getTopProducts(),
      ]);
      setProducts(allProducts);
      setTopProducts(top);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { products, topProducts, loading, error, refresh: loadProducts };
}
