import { ISeller } from "@/interfaces";
import { SellerService } from "@/services";
import { create } from "zustand";

interface useSellerStoreProps {
 find: (name?: string, email?: string) => Promise<ISeller[]>;
}

export const useSellerStore = create<useSellerStoreProps>(() => ({
  find: (name?: string, email?: string) => SellerService.find(name,email),
}));
