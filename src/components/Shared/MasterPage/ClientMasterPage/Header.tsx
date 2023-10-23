import { useState } from "react";
import {
  AppBar,
  Badge,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { useCartStore } from "@/stores";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const router = useRouter();
  const cartStore = useStore(useCartStore);
  const sellerId = (router.query || {}).sellerId as string;
  const sellerProducts = cartStore.getSellerProducts(sellerId as string);

  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleRemoveItem(productId: string) {
    cartStore.removeProduct(sellerId || "", productId);
  }
  
  const handleToggleCart = () => {
    if (sellerProducts.length > 0) {
      setIsCartOpen(!isCartOpen); 
    }
  };

  return (
    <>
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
          {sellerProducts.length !== 0 && (
            <Button color="inherit" onClick={handleToggleCart}>
              <Badge badgeContent={sellerProducts.length} color="error">
                Carrinho
                <ShoppingCartIcon />
              </Badge>
            </Button>
          )}
          <Button color="inherit" onClick={() => router.replace("/admins/login")}>
            <LoginIcon />
            &nbsp; Entrar
          </Button>
        </Toolbar>
      </AppBar>

      <CartDrawer
        open={isCartOpen}
        products={sellerProducts}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
        router.replace(`/sellers/${sellerId}/checkout`)        
        }}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
}
