import { IProduct, IProductHandler } from "@/interfaces";
import { useClientSellerStore } from "@/stores/client-seller.store";
import { List, ListItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { SellerProductsItem } from "./Item";
import { ProductForm } from "./Form";

interface SellerProductsProps {
  sellerId?: string | null | undefined;
}

export function SellerProducts(props: SellerProductsProps) {
  const clientSellerStore = useStore(useClientSellerStore);
  const { sellerId } = props;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(true);
  const [productForm, setProductForm] = useState<IProduct | null>(null);

  useEffect(() => {
    sellerId && loadProducts(sellerId as string);
  }, [sellerId]);

  function loadProducts(sellerId: string): void {
    setProcessing(true);

    clientSellerStore
      .findProducts(sellerId)
      .then(setProducts)
      .catch((e) => window.alert(e))
      .finally(() => setProcessing(false));
  }

  const filteredProducts = products.filter((p) =>
    p.label.toLowerCase().includes(filter.toLowerCase())
  );

  
  return (
    <>
      <Typography variant="h4">
        Produtos {filteredProducts.length}
      </Typography>
      <div style={{ marginTop: 10 }}>
        <TextField
          label="Filtrar"
          placeholder="Meu produto..."
          variant="outlined"
          value={filter}
          fullWidth
          onChange={(e) => setFilter(e.target.value || '')}
        />
      </div>
      <List>
  {filteredProducts.map((product, index) => (
    <div key={index}>
      <SellerProductsItem
        product={product}
        onClick={setProductForm} 
      />
    </div>
  ))}
  {!processing && filteredProducts.length === 0 && (
    <ListItem>
      <Typography>
        <b>Nenhum Produto Encontrado</b>
      </Typography>
    </ListItem>
  )}
</List>
      
      <ProductForm
        product={productForm}
        onSave={(p) => console.log('Salvou', p)}
        onClose={() => setProductForm(null)}
      />
    </>
  );
}
