import { IProduct, IProductHandler } from "@/interfaces";
import {
  Button,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CustomBox } from "./styles";

interface ProductFormProps {
  product?: IProduct | null | undefined;
  onChange: (product: IProduct) => void;
  onSave: (product: IProduct) => void;
  onClose: () => void;
}

export function ProductForm(props: ProductFormProps) {
  const [product, setProduct] = useState<IProduct>(
    IProductHandler.getProduct()
  );
  const { onChange, onSave, onClose } = props;

  useEffect(() => {
    setProduct(props.product || IProductHandler.getProduct());
  }, [props.product]);

  function handleChangeField(key: string, value: any): void {
    onChange({ ...product, [key]: value });
  }

  return (
    <Modal open={Boolean(props.product)} onClose={onClose}>
      <CustomBox>
        <Typography variant="h5">
          {product._id ? "Editar" : "Criar"} produto
        </Typography>
        <List>
          <ListItem>
            <TextField
              label="Nome"
              placeholder="Meu produto..."
              fullWidth
              value={product.label}
              onChange={(e) => handleChangeField("label", e.target.value || "")}
            />
          </ListItem>
          <ListItem>
            <TextField
              type="number"
              label="Preço"
              placeholder="0.00"
              fullWidth
              value={product.price}
              onChange={(e) => handleChangeField("price", e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              type="number"
              label="Quantidade"
              placeholder="2"
              fullWidth
              value={product.quantity}
              onChange={(e) => handleChangeField("quantity", e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" onClick={() => onSave(product)}>
              {product._id ? 'Alterar' : 'Criar'}
            </Button>
          </ListItem>
        </List>
      </CustomBox>
    </Modal>
  );
}
