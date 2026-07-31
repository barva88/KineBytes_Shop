'use client';
import type { StoreProduct } from '@/types/store';
import { SingleProductExclusiveLanding } from './SingleProductExclusiveLanding';
import { GrowingEcosystemShop } from './GrowingEcosystemShop';
import { FullEcommerceShop } from './FullEcommerceShop';

export function DynamicHomeLayout({ products }: { products: StoreProduct[] }) {
  const count = products.length;

  // 1. SI HAY UN SOLO PRODUCTO (products.length === 1)
  if (count === 1) {
    return <SingleProductExclusiveLanding product={products[0]} />;
  }

  // 2. SI HAY DE 2 A 4 PRODUCTOS (products.length > 1 && products.length <= 4)
  if (count > 1 && count <= 4) {
    return <GrowingEcosystemShop products={products} />;
  }

  // 3. SI HAY 5 O MÁS PRODUCTOS (products.length >= 5)
  if (count >= 5) {
    return <FullEcommerceShop products={products} />;
  }

  // FALLBACK SI NO HAY PRODUCTOS EN BD TODAVÍA
  // Si la BD está vacía temporalmente, mostramos la versión de producto exclusivo con datos demo.
  const fallbackProduct: StoreProduct = {
    id: 'demo-01',
    slug: 'kinepulse-pro',
    name: 'KinePulse Pro Gen 5',
    shortDescription: 'Hardware biométrico de alta fidelidad para captura de datos atléticos en tiempo real.',
    description: 'Hardware biométrico de alta fidelidad para captura de datos atléticos en tiempo real con transmisión Bluetooth 5.3 y batería de 48 horas.',
    category: 'interactive-hardware',
    price: 299,
    rating: 5.0,
    reviewCount: 42,
    stock: 'in-stock',
    condition: 'new',
    features: ['Telemetría 100Hz', 'Sensor PPG + EMG', 'Sumergible IP68'],
    specifications: [
      { label: 'Batería', value: 'Li-Po 3000mAh (48 hrs)' },
      { label: 'Conectividad', value: 'BLE 5.3 + WiFi 2.4GHz' },
    ],
    variants: [{ id: 'default', label: 'Standard', priceDelta: 0, stock: 10 }],
    tags: ['nuevo', 'destacado'],
    images: ['⚡'],
    accent: 'from-emerald-500/25 via-emerald-500/10 to-transparent',
    isFeatured: true,
  };

  return <SingleProductExclusiveLanding product={fallbackProduct} />;
}
