import { IProduct } from "@/interfaces";
import axios from "axios";

const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function findProducts(sellerId: string, label?: string): Promise<IProduct[]> {
  const query: any = {};
  if (label) {
    query.label = label;
  }

  const params = new URLSearchParams(query).toString();
  return new Promise((resolve, reject) => {
    const url = `${basePath}/clients/sellers/${sellerId}/products?${params}`;
    axios
      .get(url)
      .then((response) => resolve(response.data || []))
      .catch(() => reject("Erro ao tentar buscar produtos."));
  });
}

function getProduct(sellerId: string, productId: string): Promise<IProduct> {
  const query: any = {};

  return new Promise((resolve, reject) => {
    const url = `${basePath}/clients/sellers/${sellerId}/products?${productId}`;
    axios
      .get(url)
      .then((response) => resolve(response.data || []))
      .catch(() => reject("Erro ao tentar buscar produto."));
  });
}


export const ClientSellerService = {
  findProducts, getProduct
};
