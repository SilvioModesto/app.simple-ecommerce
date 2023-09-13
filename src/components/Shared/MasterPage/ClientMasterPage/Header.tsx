import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          style={{ cursor: "pointer" }}
          variant="h6"
          sx={{ flexGrow: 1 }}
          onClick={() => router.replace("/")}
        >
          Home - {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
        <Button color="inherit" onClick={() => router.replace("/cart")}>
          <ShoppingCartIcon />
          Carrinho
        </Button>
        <Button color="inherit" onClick={() => router.replace("/admins/login")}>
          <LoginIcon />
          &nbsp; Entrar
        </Button>
      </Toolbar>
    </AppBar>
  );
}
