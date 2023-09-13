import { useLayoutStore, useUserStore } from "@/stores";
import { Button, Divider, Drawer, ListItem, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { ListCustom, ListItemBack } from "./style";

export function SideMenu() {
  const router = useRouter();
  const userStore = useStore(useUserStore);
  const layoutStore = useStore(useLayoutStore);

  function handleSignout() {
    if (window.confirm("Deseja realmente deslogar?")) {
      userStore.signout();
      layoutStore.setSidebar(false);
    }
  }

  function handleGoTo(path: string): void {
    router.replace(path);
    layoutStore.setSidebar(false);
  }

  return (
    <Drawer
      open={layoutStore.sidebar}
      onClose={() => layoutStore.setSidebar(false)}
    >
      <ListCustom>
        <ListItemBack onClick={() => layoutStore.setSidebar(false)}>
          <Typography>
            <ArrowBackIosNewIcon
              fontSize="small"
              style={{ verticalAlign: "middle" }}
            />
          </Typography>
        </ListItemBack>
        <Divider />
        <ListItem>
          <Button onClick={() => handleGoTo("/admins/products")}>
            <LocalMallIcon />
            &nbsp; Produtos
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => handleGoTo("/admins/orders")}>
            <ShoppingCartIcon />
            &nbsp; Pedidos
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => handleGoTo("/admins/settings")}>
            <SettingsIcon />
            &nbsp; Configurações
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <Button onClick={handleSignout}>
            <ExitToAppIcon />
            &nbsp; Sair
          </Button>
        </ListItem>
      </ListCustom>
    </Drawer>
  );
}
