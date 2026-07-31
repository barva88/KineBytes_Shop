import { getProducts } from '@/lib/products-service';
import { DynamicHomeLayout } from '@/components/home/DynamicHomeLayout';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-kb-black">
      <DynamicHomeLayout products={products} />
    </div>
  );
}
