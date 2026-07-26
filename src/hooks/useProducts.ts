import { useState, useEffect } from 'react';
import { getProductsFromSupabase } from '@/lib/products-service';
import { MOCK_PRODUCTS } from '@/lib/constants';
import type { StoreProduct } from '@/types/store';

export function useProducts() {
  const [products, setProducts] = useState<StoreProduct[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getProductsFromSupabase().then((data) => {
      if (isMounted) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading };
}
