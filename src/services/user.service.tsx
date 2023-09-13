import { ISignin, ISignup } from "@/interfaces";
import axios from "axios";

const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function signin(data: ISignin): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = `${basePath}/users/signin`;
    axios
      .post(url, data)
      .then((response) => resolve(response.data))
      .catch(() => reject('Erro ao tentar autenticar usuário.'));
  });
}

function signup(data: ISignup): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = `${basePath}/users/signup`;
    axios
      .post(url, data)
      .then((response) => resolve(response.data))
      .catch(() => reject('Erro ao fazer tentar criar usuário.'));
  });
}

export const UserService = {
  signin,
  signup,
};
