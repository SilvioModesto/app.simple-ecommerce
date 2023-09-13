import { IProduct } from "@/interfaces";
import { ProductListItem } from "./Item";
import { List, Typography } from "@mui/material";

interface ProductListProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function ProductList(props: ProductListProps) {
  const { products, onEdit, onRemove } = props;

  function handleRemove(product: IProduct): void {
    const msg = `Deseja realmente remover "${product.label}"?`;
    window.confirm(msg) && onRemove(product);
  }

  return (
    <>
      <Typography variant="h5">Produtos ({products.length})</Typography>
      <List>
        {products.map((item, index) => (
          <ProductListItem
            key={index}
            product={item}
            onEdit={onEdit}
            onRemove={handleRemove}
          />
        ))}

        {products.length === 0 &&
          <Typography>Nenhum produto disponível.</Typography>
        }
      </List>
    </>
  );
}
