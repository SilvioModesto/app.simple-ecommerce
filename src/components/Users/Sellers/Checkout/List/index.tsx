import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  } from "@mui/material";
import { useState } from "react";
import { Item } from "./item";
import { IProduct, IProductHandler } from "@/interfaces";

interface CheckoutProductListProps {
  products: IProduct[];
  onChange: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function CheckoutProductList(props: CheckoutProductListProps) {
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);

  function handleConfirmDelete() {
    props.onRemove(deleteTarget!);
    setDeleteTarget(null);
  }

  return (
    <>
      <List>
        {props.products.map((item, index) => (
          <Item
            key={index}
            product={item}
            onChange={props.onChange}
            onRemove={(product) => setDeleteTarget(product)}
          />
        ))}
      </List>

      <Dialog open={Boolean(deleteTarget)} disableEscapeKeyDown>
        <DialogTitle>Excluir Produto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja realmente excluir o produto{" "}
            <strong>{deleteTarget?.label || ""}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button variant="contained" onClick={handleConfirmDelete} autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
