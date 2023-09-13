import { IProduct } from "@/interfaces";
import { Divider, IconButton, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductItemListProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function ProductListItem(props: ProductItemListProps) {
  const { product } = props;
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton onClick={() => props.onEdit(product)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => props.onRemove(product)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <Typography>{product.label}</Typography>
      </ListItem>
      <Divider />
    </>
  );
}
