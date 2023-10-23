import { IOrder } from "@/interfaces";
import axios from "axios";

const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function postOrder(sellerId: string, order: IOrder): Promise<IOrder> {
  const query: any = {};

  return new Promise((resolve, reject) => {
    const url = `${basePath}/clients/sellers/${sellerId}/order`;
    axios
      .post(url, order)
      .then((response) => resolve(response.data))
      .catch(() => reject("Erro ao salvar ordem."));
  });
}

export const ClientOrderService = {
  postOrder,
};
