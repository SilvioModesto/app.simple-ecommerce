import { ISignin } from "@/interfaces";
import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface SigninProps {
  onConfirm: (form: ISignin) => void;
}

export function Signin(props: SigninProps) {
  const [form, setForm] = useState<ISignin>({
    email: "",
    password: "",
  });

  function handleChangeForm(key: string, value: any): void {
    setForm({ ...form, [key]: value });
  }

  function handleConfirm(): void {
    if (form.email.length < 3) {
      window.alert("Por favor, informe um email válido");
      return;
    }

    if (form.password.length < 3) {
      window.alert("A senha deve conter pelo menos 3 caracteres");
      return;
    }

    props.onConfirm(form);
  }

  return (
    <List>
      <ListItem>
        <Typography variant="h5">Entrar</Typography>
      </ListItem>
      <ListItem>
        <TextField
          label="Email"
          placeholder="jhon.doe@email.com"
          value={form.email}
          onChange={(e) => handleChangeForm("email", e.target.value || "")}
          fullWidth
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Senha"
          placeholder="***"
          type="password"
          value={form.password}
          onChange={(e) => handleChangeForm("password", e.target.value || "")}
          fullWidth
        />
      </ListItem>
      <ListItem>
        <Button variant="contained" color="success" onClick={handleConfirm}>
          Entrar
        </Button>
      </ListItem>
    </List>
  );
}
