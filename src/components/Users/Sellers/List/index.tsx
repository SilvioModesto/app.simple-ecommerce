import { ISeller } from "@/interfaces";
import { useSellerStore } from "@/stores";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import router, { Router } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "zustand";


export function SellerList() {
  const sellerStore = useStore(useSellerStore);
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    loadSellers();
  }, []);

  function loadSellers() {
    setProcessing(true);

    sellerStore
      .find()
      .then(setSellers)
      .catch((e) => window.alert(e))
      .finally(() => setProcessing(false))
  }

  return (
    <>
      <Typography variant="h5">Lista de vendedores</Typography>
      <Box>
        {processing && <Typography variant="body1">Carregando...</Typography>}
        {sellers.map((item, index) => (
          <Card key={index} style={{ margin: 20}}>
            <CardContent>
              <Typography variant="h6">
                {item.name} Marketplace
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=> router.replace(`/sellers/${item._id}/products`)}>Ver Produtos</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}