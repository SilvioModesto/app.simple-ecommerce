import { IProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useCartStoreProps {
  carts: any;
  addProduct: (sellerId: string, product: IProduct) => void;
  removeProduct: (sellerId: string, productId: string) => void;
  setProductQuantity: (
    sellerId: string,
    productId: string,
    quantity: number
  ) => void;
  getSellerProducts: (sellerId: string) => IProduct[];
  clear: (sellerId: string) => void;
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

        const index = carts[sellerId].products.findIndex(
          (p: IProduct) => p._id === product._id
        );

        if (index < 0) {
          carts[sellerId].products.push(product);
        } else {
          carts[sellerId].products[index].quantity += product.quantity;
        }

        set({ ...cache, carts });
      },

      removeProduct: (sellerId: string, productId: string) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[sellerId]) {
          return;
        }

        const index = carts[sellerId].products.findIndex(
          (p: IProduct) => p._id === productId
        );
        if (index < 0) {
          return;
        }

        carts[sellerId].products.splice(index, 1);

        set({ ...cache, carts });
      },

      setProductQuantity: (
        sellerId: string,
        productId: string,
        quantity: number
      ) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[sellerId]) {
          return;
        }

        const index = carts[sellerId].products.findIndex(
          (p: IProduct) => p._id === productId
        );
        if (index < 0) {
          return;
        }

        carts[sellerId].products[index].quantity = Math.max(quantity, 1);

        set({ ...cache, carts });
      },

      getSellerProducts: (sellerId: string) => {
        const carts = get().carts;
        if (!carts[sellerId]) {
          return [];
        }

        return carts[sellerId].products;
      },

      clear: (sellerId: string) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[sellerId]) {
          return;
        }

        carts[sellerId].products = [];
        set({ ...cache, carts });
      }
    }),
    { name: "cart-store" }
  )
);
