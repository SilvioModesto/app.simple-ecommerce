import { IProduct } from "@/interfaces";
import { Divider, ListItem, Typography } from "@mui/material";

interface SellerProductsItemProps {
  product: IProduct;
  onClick: (product: IProduct) => void;
}

export function SellerProductsItem(props: SellerProductsItemProps) {
  const { product, onClick } = props;

  return (
    <>
      <ListItem onClick={() => onClick(product)} style={{ cursor: "pointer"}}>
        <Typography>{product.label}</Typography>
      </ListItem>
      <Divider />
    </>
  );
}