import { getProducts } from '@/lib/products-service';
import { ProductListContent } from './ProductListContent';

export default async function ProductListPage() {
  const products = await getProducts();
  return <ProductListContent initialProducts={products} />;
}
