import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { StoreProduct, StoreCategorySlug, StockStatus, ProductCondition } from '@/types/store';

export async function getProducts(): Promise<StoreProduct[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: productsData, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !productsData || productsData.length === 0) return [];

    const productIds = productsData.map((p) => p.id);
    const [variantsRes, specsRes] = await Promise.all([
      supabase.from('product_variants').select('*').in('product_id', productIds),
      supabase.from('product_specifications').select('*').in('product_id', productIds).order('sort_order', { ascending: true }),
    ]);

    const variantsMap: Record<string, { id: string; label: string; priceDelta: number; stock: number }[]> = {};
    (variantsRes.data || []).forEach((v) => {
      if (!variantsMap[v.product_id]) variantsMap[v.product_id] = [];
      variantsMap[v.product_id].push({ id: v.id, label: v.label, priceDelta: Number(v.price_delta || 0), stock: v.stock });
    });

    const specsMap: Record<string, { label: string; value: string }[]> = {};
    (specsRes.data || []).forEach((s) => {
      if (!specsMap[s.product_id]) specsMap[s.product_id] = [];
      specsMap[s.product_id].push({ label: s.label, value: s.value });
    });

    const dbProducts = productsData.map((p) => ({
      id: p.id, slug: p.slug, name: p.name,
      shortDescription: p.short_description || '', description: p.description || '',
      category: p.category as StoreCategorySlug, price: Number(p.price),
      compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
      rating: Number(p.rating || 5.0), reviewCount: p.review_count || 0,
      stock: (p.stock_status || 'in-stock') as StockStatus,
      condition: (p.condition || 'new') as ProductCondition,
      features: p.features || [], specifications: specsMap[p.id] || [],
      variants: variantsMap[p.id] || [{ id: 'default', label: 'Standard', priceDelta: 0, stock: 10 }],
      tags: p.tags || [], images: p.images || [],
      accent: p.accent || 'from-emerald-500/25 via-emerald-500/10 to-transparent',
      isFeatured: Boolean(p.is_featured),
    }));

    return dbProducts;
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}
