import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useStore } from "zustand";
import { CheckoutProductList } from "./List";
import { AddressDataForm } from "./AddressDataForm";
import { EPaymentMethod } from "@/enums";
import { IAddressData, IProduct, IProductHandler } from "@/interfaces";
import { useCartStore } from "@/stores";
import { IOrder, IOrderHandler } from "@/interfaces/order.interface";
import { useClientOrderStore } from "@/stores/client-order.store";
import { useRouter } from "next/router";
import { BillingDataForm } from "./BillingDataForm";

const containerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
};

const paperStyle = {
  width: "100%",
  maxWidth: "800px",
  padding: "16px",
  margin: "10px",
};

interface CheckoutProps {
  sellerId?: string | null | undefined;
}

export function Checkout(props: CheckoutProps) {
  const clientOrderStore = useStore(useClientOrderStore);
  const cartStore = useStore(useCartStore);
  const [order, setOrder] = useState<IOrder>(IOrderHandler.empty());
  const [sameAddress, setSameAddress] = useState<boolean>(true);
  const router = useRouter();

  
  useEffect(() => {
    props.sellerId && setOrder({ ...order, products: cartStore.carts[props.sellerId].products });
  }, [cartStore, props.sellerId, order]);

  function handleChangeDeliveryData(deliveryData: IAddressData){
    const data = {...order, deliveryData};

    if (sameAddress){
      data.billingData = deliveryData
    }
    setOrder(data)
  }

  function handleRemove(myProduct: IProduct): void {
    cartStore.removeProduct(props.sellerId!, myProduct._id!);
  }

  function handleChangeQuantity(myProduct: IProduct): void {
    cartStore.setProductQuantity(
      props.sellerId!,
      myProduct._id!,
      myProduct.quantity
    );
  }

  function handleCheckout(): void {
    console.log('Finalizar compra:', order)
    console.log('Produtos comprados:', order.products)

    clientOrderStore
      .postOrder(props.sellerId!, order)
      .then(() => {
        router.replace('/');
        cartStore.clear(props.sellerId!);
        window.alert('Compra realizada com sucesso!');
      })
      .catch(() => window.alert('Erro ao finalizar compra'));
  }

  return (
    <div style={containerStyle}>
      <Paper elevation={12} style={paperStyle}>
        <Typography variant="h5" align="center">
          Finalizar Compra
        </Typography>
        <Divider />

        <CheckoutProductList
          products={order.products}
          onChange={handleChangeQuantity}
          onRemove={handleRemove}
        />

        <Typography variant="h5" align="right" style={{ marginTop: "10px", marginBottom: "10px" }}>
          Total: R$ {IProductHandler.getTotal(order.products).toFixed(2)}
        </Typography>
      </Paper>

      <AddressDataForm
        address={order.deliveryData}
        onChange={handleChangeDeliveryData}
        
      />

      <FormControlLabel
        control={
          <Switch
            defaultChecked={sameAddress}
            value={sameAddress}
            onClick={() => setSameAddress(!sameAddress)}
          />
        }
        label="Endereço de cobrança é o mesmo de entrega." />

      <Divider />

      {!sameAddress &&
        <BillingDataForm
          address={order.billingData}
          onChange={(billingData) => setOrder({ ...order, billingData })}
        />}

      <Paper elevation={12} style={paperStyle}>
        <Typography variant="h5" align="center">
          Forma de Pagamento
        </Typography>
        <Select
          label="Forma de pagamento"
          value={order.paymentMethod}
          onChange={(e) =>
            setOrder({ ...order, paymentMethod: e.target.value as any })
          }
          fullWidth
        >
          <MenuItem value={EPaymentMethod.CREDIT_CARD}>
            Cartão de crédito
          </MenuItem>
          <MenuItem value={EPaymentMethod.PIX}>Pix</MenuItem>
          <MenuItem value={EPaymentMethod.CASH}>Dinheiro</MenuItem>
        </Select>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          onClick={handleCheckout}
        >
          Finalizar Compra
        </Button>
      </Paper>
    </div>
  );
}
