import { IProduct, IProductHandler } from "@/interfaces";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

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
          Adicionar <strong>{product.label}</strong>
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
        <DialogContent>
          <Typography>Preço unit. <strong>{product.price}</strong></Typography>
          <Typography>Preço total <strong>{product.price * product.quantity}</strong></Typography>
          <div>
          <Button onClick={() => setProduct({ ...product, quantity: product.quantity - 1 })}>-</Button>
            <TextField
              type="number"
              variant="outlined"
              value={product.quantity}
              onChange={(e) =>
                setProduct({
                  ...product,
                  quantity: Number(e.target.value || 0),
                })
              }
            />
            <Button onClick={() => setProduct({ ...product, quantity: product.quantity + 1 })}>+</Button>
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="text"
            onClick={() => handleSave()}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
