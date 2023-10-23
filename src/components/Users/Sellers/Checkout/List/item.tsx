import { ListItem, IconButton, Typography, Box, Grid, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IProduct } from "@/interfaces";

interface ItemProps {
  product: IProduct;
  onChange: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function Item(props: ItemProps) {
  const { product, onChange, onRemove } = props;
  
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={() => onRemove(product)} color="secondary">
            <DeleteIcon />
          </IconButton>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{product.label}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton color="primary" onClick={() => onChange({...product,quantity: product.quantity-1})}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6">{product.quantity}</Typography>
              <IconButton color="primary" onClick={() => onChange({...product,quantity: product.quantity+1})}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="subtitle1">
          Preço Total: R${(product.price * product.quantity).toFixed(2)}
        </Typography>
      </ListItem>
      <Divider />
    </>
  );
}
