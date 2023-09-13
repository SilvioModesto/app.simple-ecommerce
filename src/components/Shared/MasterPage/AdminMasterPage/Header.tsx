import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from "zustand";
import { useLayoutStore, useUserStore } from "@/stores";

export function Header(props: any) {
  const userStore = useStore(useUserStore);
  const layoutStore = useStore(useLayoutStore);

  return (
    <AppBar position="fixed">
      <Toolbar>
        {userStore.authenticated &&
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => layoutStore.setSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
        }
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin - {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
        {userStore.authenticated &&
          <Button color="inherit">Minha Conta</Button>
        }
      </Toolbar>
    </AppBar>
  );
}
