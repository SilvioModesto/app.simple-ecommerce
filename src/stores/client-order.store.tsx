import { IOrder} from "@/interfaces";
import { ClientOrderService } from "@/services/client-order.service";
import { create } from "zustand";

interface useClientOrderStoreProps {
  postOrder: (sellerId: string, order: IOrder  ) => Promise<IOrder>
}

export const useClientOrderStore = create<useClientOrderStoreProps>((set) => ({
  postOrder: (sellerId: string, order: IOrder) => ClientOrderService.postOrder(sellerId, order),
  
}));
