import { IProduct } from "@/interfaces";
import { ProductService } from "@/services";
import { create } from "zustand";

interface useProductStoreProps {
  upsert: (data: IProduct) => Promise<IProduct>;
  list: () => Promise<IProduct[]>;
  remove: (id: string) => Promise<void>;
}

export const useProductStore = create<useProductStoreProps>((set) => ({
  upsert: ProductService.upsert,
  list: ProductService.list,
  remove: ProductService.remove,
}));
