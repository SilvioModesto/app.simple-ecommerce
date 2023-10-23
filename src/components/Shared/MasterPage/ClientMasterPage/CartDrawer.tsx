import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { IProduct } from "@/interfaces";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { useStore } from "zustand";
import { useCartStore } from "@/stores/cart.store";

interface CartDrawerProps {
  open: boolean;
  products: IProduct[];
  onClose: () => void;
  onCheckout: () => void;
  onRemoveItem: (productId: string) => void;
}

export function CartDrawer(props: CartDrawerProps) {
  const { open, products, onClose, onCheckout, onRemoveItem } = props;
  const cartStore = useStore(useCartStore)

  function handlePurchase() {
    onCheckout();
    onClose();
  }

  function calculateTotalPrice() {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
        Carrinho de Compras
      </Typography>
      <List>
        {products.length === 0 ? (
          <ListItem>
            <Typography variant="body2">Seu carrinho está vazio.</Typography>
          </ListItem>
        ) : (
          <>
            <Divider />
            {products.map((product) => (
              <ListItem
                key={product._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="body1">{product.label}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    R${(product.price * product.quantity).toFixed(2)}
                  </Typography>

                  <Typography variant="body2">Quantidade: {product.quantity}</Typography>
                </div>
                <div>
                  <Tooltip title="Remover Item">
                    <IconButton onClick={() => onRemoveItem(product._id!)} color="secondary" >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItem>
            ))}
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h6">
                Total: ${calculateTotalPrice().toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={handlePurchase}
              >
                Comprar
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
