import { IProduct } from "@/interfaces";
import axios from "axios";

const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function upsert(data: IProduct): Promise<IProduct> {
  return new Promise((resolve, reject) => {
    const url = `${basePath}/products`;
    axios[data._id ? "put" : "post"](url, data)
      .then((response) => resolve(response.data))
      .catch(() => reject("Erro ao tentar salvar produto."));
  });
}

function list(): Promise<IProduct[]> {
  return new Promise((resolve, reject) => {
    const url = `${basePath}/products`;
    axios
      .get(url)
      .then((response) => resolve(response.data || []))
      .catch(() => reject("Erro ao tentar buscar produtos."));
  });
}

function remove(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `${basePath}/products/${id}`;
    axios
      .delete(url)
      .then((response) => resolve(response.data || []))
      .catch(() => reject("Erro ao tentar remover produto."));
  });
}

export const ProductService = {
  upsert,
  list,
  remove,
};
