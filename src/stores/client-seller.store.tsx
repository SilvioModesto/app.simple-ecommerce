import { IProduct } from "@/interfaces";
import { ClientSellerService } from "@/services";
import { create } from "zustand";

interface useClientSellerStoreProps {
  findProducts: (sellerId: string, label?: string) => Promise<IProduct[]>;
  getProduct: (sellerId: string, productId: string) => Promise<IProduct>;
}

export const useClientSellerStore = create<useClientSellerStoreProps>(() => ({
  findProducts: (sellerId: string, label?: string) => ClientSellerService.findProducts(sellerId, label),
  getProduct: (sellerId: string, productId: string) => ClientSellerService.getProduct(sellerId, productId),
}));
