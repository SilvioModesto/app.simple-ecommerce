import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { useCartStore } from "@/stores";

export function Header() {
  const router = useRouter();
  const cartStore = useStore(useCartStore);
  const sellerId = (router.query || {}).sellerId;
  const sellerProducts = cartStore.getSellerProducts(sellerId as string);

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
        {sellerProducts.length !== 0 &&
          <Button color="inherit" onClick={() => router.replace("/cart")}>
              <Badge badgeContent={sellerProducts.length} color="error">
              Carrinho
              <ShoppingCartIcon />
            </Badge>
          </Button>
        }
        <Button color="inherit" onClick={() => router.replace("/admins/login")}>
          <LoginIcon />
          &nbsp; Entrar
        </Button>
      </Toolbar>
    </AppBar>
  );
}
