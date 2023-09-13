import { AuthGuard } from "@/components/Shared";
import { useUserStore } from "@/stores"
import { Typography } from "@mui/material";
import { useStore } from "zustand"

export default function Home() {
  const userStore = useStore(useUserStore);

  return (
    <AuthGuard>
      <Typography variant="h5">Olá {userStore.data.userName}</Typography>
    </AuthGuard>
  )
}
