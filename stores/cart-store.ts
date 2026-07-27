import { useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, ShippingAddress, StoreProduct } from '@/types/store';
import { SHIPPING_OPTIONS } from '@/lib/constants';

interface CartState {
  items: CartItem[];
  shippingAddressData: ShippingAddress;
  selectedShippingId: string;

  addItem: (product: StoreProduct, variantId: string, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  updateShippingAddress: (field: keyof ShippingAddress, value: string) => void;
  setShippingMethod: (id: string) => void;
}

const emptyAddress: ShippingAddress = {
  firstName: '', lastName: '', email: '', phone: '',
  country: '', city: '', addressLine1: '', addressLine2: '', postalCode: '',
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingAddressData: emptyAddress,
      selectedShippingId: 'standard',

      addItem: (product, variantId, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.id && i.variantId === variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id && i.variantId === variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId: product.id, variantId, quantity, product }] };
        });
      },
      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        }));
      },
      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      updateShippingAddress: (field, value) => {
        set((state) => ({
          shippingAddressData: { ...state.shippingAddressData, [field]: value },
        }));
      },
      setShippingMethod: (id) => set({ selectedShippingId: id }),
    }),
    {
      name: 'kinebytes-shop-cart',
      partialize: (state) => ({
        items: state.items,
        shippingAddressData: state.shippingAddressData,
        selectedShippingId: state.selectedShippingId,
      }),
    }
  )
);

export function useCartProducts() {
  const items = useCartStore((s) => s.items);

  return useMemo(() => {
    return items
      .map((item) => {
        const product = item.product;
        if (!product) return null;
        const variant = product.variants.find((v) => v.id === item.variantId) ?? product.variants[0];
        const unitPrice = product.price + (variant?.priceDelta ?? 0);
        const lineTotal = unitPrice * item.quantity;
        return { item, product, variantLabel: variant?.label ?? 'Default', unitPrice, lineTotal };
      })
      .filter(Boolean) as Array<{
        item: CartItem;
        product: StoreProduct;
        variantLabel: string;
        unitPrice: number;
        lineTotal: number;
      }>;
  }, [items]);
}

export function useCartItemCount() {
  const cartProducts = useCartProducts();
  return useMemo(() => cartProducts.reduce((sum, cp) => sum + cp.item.quantity, 0), [cartProducts]);
}

export function useCartSubtotal() {
  const cartProducts = useCartProducts();
  return useMemo(() => cartProducts.reduce((sum, cp) => sum + cp.lineTotal, 0), [cartProducts]);
}

export function useCartShippingCost() {
  const selectedShippingId = useCartStore((s) => s.selectedShippingId);
  return useMemo(() => {
    const option = SHIPPING_OPTIONS.find((o) => o.id === selectedShippingId);
    return option?.price ?? 0;
  }, [selectedShippingId]);
}

export function useCartTotal() {
  const subtotal = useCartSubtotal();
  const shippingCost = useCartShippingCost();
  return subtotal + shippingCost;
}
