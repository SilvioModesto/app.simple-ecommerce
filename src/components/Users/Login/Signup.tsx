import { ISignup } from "@/interfaces";
import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface SignupProps {
  onConfirm: (form: ISignup) => void;
}

export function Signup(props: SignupProps) {
  const [form, setForm] = useState<ISignup>({
    email: "",
    name: "",
    password: "",
  });
  const [formConfirm, setFormConfirm] = useState<ISignup>({
    email: "",
    name: "",
    password: "",
  });

  function handleChangeForm(key: string, value: any): void {
    setForm({ ...form, [key]: value });
  }

  function handleChangeFormConfirm(key: string, value: any): void {
    setFormConfirm({ ...formConfirm, [key]: value });
  }

  function handleConfirm(): void {
    if (form.name.length < 3) {
      window.alert('O nome deve conter pelo menos 3 caracteres');
      return;
    }

    if (form.email.length < 3) {
      window.alert('O email deve conter pelo menos 3 caracteres');
      return;
    }

    if (form.email !== formConfirm.email) {
      window.alert('O email de confirmação deve ser igual ao email.');
      return;
    }

    if (form.password.length < 3) {
      window.alert('A senha deve conter pelo menos 3 caracteres');
      return;
    }

    if (form.password !== formConfirm.password) {
      window.alert('A senha de confirmação deve ser igual a senha.');
      return;
    }

    props.onConfirm(form);
  }

  return (
    <List>
      <ListItem>
        <Typography variant="h5">Criar Conta</Typography>
      </ListItem>
      <ListItem>
        <TextField
          label="Nome"
          placeholder="Jhon Doe"
          fullWidth
          value={form.name}
          onChange={(e) => handleChangeForm("name", e.target.value || "")}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Email"
          placeholder="jhon.doe@mail.com"
          type="email"
          fullWidth
          value={form.email}
          onChange={(e) => handleChangeForm("email", e.target.value || "")}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Confirme o Email"
          placeholder="jhon.doe@mail.com"
          type="email"
          fullWidth
          value={formConfirm.email}
          onChange={(e) =>
            handleChangeFormConfirm("email", e.target.value || "")
          }
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Senha"
          placeholder="***"
          type="password"
          fullWidth
          value={form.password}
          onChange={(e) => handleChangeForm("password", e.target.value || "")}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Confirme a senha"
          placeholder="***"
          type="password"
          fullWidth
          value={formConfirm.password}
          onChange={(e) =>
            handleChangeFormConfirm("password", e.target.value || "")
          }
        />
      </ListItem>
      <ListItem>
        <Button variant="contained" color="success" onClick={handleConfirm}>Criar</Button>
      </ListItem>
    </List>
  );
}
