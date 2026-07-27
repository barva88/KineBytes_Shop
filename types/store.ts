/* ──────────────────────────────────────────
   Store Types — Compatible with KineByte
   ────────────────────────────────────────── */

export type StoreCategorySlug =
  | 'interactive-hardware'
  | 'sensors'
  | 'training-packs'
  | 'software'
  | 'accessories';

export type ProductCondition = 'new' | 'preorder' | 'bundle';
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';
export type PaymentMethod = 'card' | 'paypal' | 'transfer';

export interface StoreCategory {
  slug: StoreCategorySlug;
  name: string;
  description: string;
  icon: string;
  accent: string;
}

export interface StoreProductVariant {
  id: string;
  label: string;
  priceDelta: number;
  stock: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: StoreCategorySlug;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stock: StockStatus;
  condition: ProductCondition;
  features: string[];
  specifications: ProductSpecification[];
  variants: StoreProductVariant[];
  tags: string[];
  images: string[];
  accent: string;
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: StoreProduct;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
}

export interface ShippingOption {
  id: string;
  label: string;
  description: string;
  price: number;
  eta: string;
}

export interface Order {
  id: string;
  reference: string;
  userId: string;
  status: 'pending' | 'processing' | 'paid' | 'fulfilled' | 'cancelled';
  subtotal: number;
  shippingCost: number;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface StoreFilters {
  category: StoreCategorySlug | 'all';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  query: string;
  priceRange: [number, number];
  condition: ProductCondition | 'all';
}
