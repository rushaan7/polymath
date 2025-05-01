import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PurchaseState {
  hasPurchased: boolean;
  purchaseDate: string | null;
  orderId: string | null;
  setPurchase: (orderId: string) => void;
  resetPurchase: () => void;
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set) => ({
      hasPurchased: false,
      purchaseDate: null,
      orderId: null,
      setPurchase: (orderId: string) => set({
        hasPurchased: true,
        purchaseDate: new Date().toISOString(),
        orderId,
      }),
      resetPurchase: () => set({
        hasPurchased: false,
        purchaseDate: null,
        orderId: null,
      }),
    }),
    {
      name: 'purchase-storage',
    }
  )
); 