import { IProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useCartStoreProps {
  carts: any;
  addProduct: (sellerId: string, product: IProduct) => void;
  removeProduct: (sellerId: string, productId: string) => void;
  getSellerProducts: (sellerId: string) => IProduct[];
}

export const useCartStore = create(
  persist<useCartStoreProps>(
    (set, get) => ({
      carts: {},

      addProduct: (sellerId: string, product: IProduct) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[sellerId]) {
          carts[sellerId] = { products: [] };
        }

        carts[sellerId].products.push(product);

        set({ ...cache, carts });
      },

      removeProduct: (sellerId: string, productId: string) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[sellerId]) {
          return;
        }

        const index = carts[sellerId].products.findIndex(
          (p: IProduct) => p._id === productId);

        if (index < 0) {
          return;
        }

        carts[sellerId].products.splice(index, 1);
        set({...cache, carts });
      },

      getSellerProducts: (sellerId: string) => {
        const carts = get().carts;
        if(!carts[sellerId]) {
          return [];
        }
        return carts[sellerId].products;
      }
    }),
    
    { name: "cart-store" }
  )
);
