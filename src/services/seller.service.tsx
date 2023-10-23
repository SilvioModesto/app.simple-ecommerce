import { ISeller } from "@/interfaces";
import axios from "axios";

const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function find(name?:string, email?: string): Promise<ISeller[]> {
  const query: any = {};
  if (name) {
    query.name = name;
  }
  if (email) {
    query.email = email;
  }

  const params = new URLSearchParams(query).toString();
    return new Promise((resolve, reject) => {
      const url = `${basePath}/clients/sellers?${params}`;
    axios
      .get(url)
      .then((response) => resolve(response.data || []))
      .catch(() => reject("Erro ao tentar buscar pontos de venda."));
  });
}


export const SellerService = {
  find
};
