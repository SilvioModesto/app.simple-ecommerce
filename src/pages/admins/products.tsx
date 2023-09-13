import { ProductForm, ProductList } from "@/components/Products";
import { AuthGuard } from "@/components/Shared";
import { IProduct, IProductHandler } from "@/interfaces";
import { useProductStore } from "@/stores";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import AddIcon from "@mui/icons-material/Add";
import { CustomFab } from "@/components/Products/Form/styles";

export default function Products() {
  const productStore = useStore(useProductStore);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  function loadProducts(): void {
    productStore
      .list()
      .then((list) => setProducts(list))
      .catch((e) => window.alert(e));
  }

  function handleSave(myProduct: IProduct): void {
    productStore
      .upsert(myProduct)
      .then(() => {
        setProduct(null);
        loadProducts();
        window.alert("produto salvo com sucesso");
      })
      .catch((e) => window.alert(e));
  }

  function handleRemove(myProduct: IProduct): void {
    productStore
      .remove(myProduct._id!)
      .then(() => {
        setProduct(null);
        loadProducts();
        window.alert("produto removido com sucesso");
      })
      .catch((e) => window.alert(e));    
  }

  return (
    <AuthGuard>
      <ProductForm
        product={product}
        onChange={setProduct}
        onSave={handleSave}
        onClose={() => setProduct(null)}
      />
      <ProductList
        products={products}
        onEdit={setProduct}
        onRemove={handleRemove}
      />
      <CustomFab
        color="primary"
        onClick={() => setProduct(IProductHandler.getProduct())}
      >
        <AddIcon />
      </CustomFab>
    </AuthGuard>
  );
}
