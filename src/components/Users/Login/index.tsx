import { useState } from "react";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { ISignin, ISignup } from "@/interfaces";
import { useStore } from "zustand";
import { useUserStore } from "@/stores";
import { useRouter } from "next/router";
import { Divider, List, ListItem, Paper } from "@mui/material";
import { ButtonType } from "./style";

export function Login() {
  const router = useRouter();
  const userStore = useStore(useUserStore);
  const [type, setType] = useState<"signin" | "signup">("signin");

  function handleConfirmSignin(form: ISignin): void {
    userStore
      .signin(form)
      .then(() => window.alert('Usuário logado'))
      .catch((error) => window.alert(`Erro: ${error}`));
  }

  function handleConfirmSignup(form: ISignup): void {
    userStore
      .signup(form)
      .then(() => window.alert('Usuário criado com sucesso.'))
      .catch((error) => window.alert(`Erro: ${error}`));
  }

  if (userStore.authenticated) {
    router.replace('/admins');
    return null;
  }

  return (
    <Paper variant="outlined">
      {type === "signin" ? (
        <Signin onConfirm={handleConfirmSignin} />
      ) : (
        <Signup onConfirm={handleConfirmSignup} />
      )}
      <Divider />
      <List>
        <ListItem>
          <ButtonType variant="contained" color={type === 'signin' ? 'inherit' : 'primary'} onClick={() => setType("signin")}>
            Ja tenho uma conta
          </ButtonType>
          <ButtonType variant="contained" color={type === 'signup' ? 'inherit' : 'primary'} onClick={() => setType("signup")}>
            Criar conta
          </ButtonType>
        </ListItem>
      </List>
    </Paper>
  );
}
