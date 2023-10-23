import { IProduct, IProductHandler } from "@/interfaces";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ProductsFormProps {
  product: IProduct | null | undefined;
  onSave: (product: IProduct) => void;
  onClose: () => void;
}

export function ProductForm(props: ProductsFormProps) {
  const { onSave, onClose } = props;
  const [product, setProduct] = useState<IProduct>(IProductHandler.getProduct());

  useEffect(() => {
    setProduct(props.product || IProductHandler.getProduct());
  }, [props.product]);

  function handleSave(): void {
    if (product.quantity < 1) {
      window.alert('Informe a quantidade');
      return;
    }
    onSave(product);
  }

  return (
    <>
      <Dialog open={Boolean(props.product)} onClose={onClose}>
        <DialogTitle>
          <strong>{product.label}:</strong>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Preço unit. <strong>{product.price}</strong></Typography>
          <Typography>Preço total.<strong> R$ {(product.price * product.quantity).toFixed(2)}</strong></Typography>
          <div>
            <IconButton
              onClick={() => setProduct({ ...product, quantity: Math.max(product.quantity - 1, 0) })}
            >
              <RemoveIcon fontSize="medium" />
            </IconButton>

            <TextField
              type="number"
              variant="outlined"
              placeholder="Quantidade"
              InputProps={{ inputProps: { min: 0 } }}
              value={product.quantity}
              onChange={(e) =>
                setProduct({
                  ...product,
                  quantity: Number(e.target.value || 0),
                })
              }
            />
            <IconButton onClick={() => setProduct({ ...product, quantity: product.quantity + 1 })}> <AddIcon fontSize="medium" /> </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="success"
            onClick={() => handleSave()}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
