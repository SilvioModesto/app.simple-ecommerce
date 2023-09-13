import { AuthGuard } from "@/components/Shared";
import { Typography } from "@mui/material";

export default function Checkouts() {
  return (
    <AuthGuard>
      <Typography>Configurações</Typography>
    </AuthGuard>
  )
}
