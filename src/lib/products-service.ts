import { supabase } from '@/lib/supabase';
import { MOCK_PRODUCTS } from '@/lib/constants';
import type { StoreProduct, StoreCategorySlug, StockStatus, ProductCondition } from '@/types/store';

/**
 * Fetch products dynamically from Supabase `public.products` table.
 * Falls back to `MOCK_PRODUCTS` if database is empty or connection fails.
 */
export async function getProductsFromSupabase(): Promise<StoreProduct[]> {
  try {
    const { data: productsData, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !productsData || productsData.length === 0) {
      return MOCK_PRODUCTS;
    }

    // Fetch variants and specs for these products
    const productIds = productsData.map((p) => p.id);

    const [variantsRes, specsRes] = await Promise.all([
      supabase.from('product_variants').select('*').in('product_id', productIds),
      supabase.from('product_specifications').select('*').in('product_id', productIds).order('sort_order', { ascending: true }),
    ]);

    const variantsMap: Record<string, any[]> = {};
    (variantsRes.data || []).forEach((v) => {
      if (!variantsMap[v.product_id]) variantsMap[v.product_id] = [];
      variantsMap[v.product_id].push({
        id: v.id,
        label: v.label,
        priceDelta: Number(v.price_delta || 0),
        stock: v.stock,
      });
    });

    const specsMap: Record<string, any[]> = {};
    (specsRes.data || []).forEach((s) => {
      if (!specsMap[s.product_id]) specsMap[s.product_id] = [];
      specsMap[s.product_id].push({
        label: s.label,
        value: s.value,
      });
    });

    return productsData.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      shortDescription: p.short_description || '',
      description: p.description || '',
      category: p.category as StoreCategorySlug,
      price: Number(p.price),
      compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
      rating: Number(p.rating || 5.0),
      reviewCount: p.review_count || 0,
      stock: (p.stock_status || 'in-stock') as StockStatus,
      condition: (p.condition || 'new') as ProductCondition,
      features: p.features || [],
      specifications: specsMap[p.id] || [],
      variants: variantsMap[p.id] || [{ id: 'default', label: 'Standard', priceDelta: 0, stock: 10 }],
      tags: p.tags || [],
      images: p.images || [],
      accent: p.accent || 'from-emerald-500/25 via-emerald-500/10 to-transparent',
      isFeatured: Boolean(p.is_featured),
    }));
  } catch {
    return MOCK_PRODUCTS;
  }
}
