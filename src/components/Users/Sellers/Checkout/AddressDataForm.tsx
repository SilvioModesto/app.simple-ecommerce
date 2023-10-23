import { IBillingData } from "@/interfaces/billing-data.interface";
import { Paper, TextField, Typography, Grid, Divider } from "@mui/material";


const formStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "10px",
};

interface AddressDataFormProps {
  address: IBillingData;
  onChange: (address: IBillingData) => void;
}

export function AddressDataForm(props: AddressDataFormProps) {
  const { address, onChange } = props;


  function handleChangeForm(key: string, value: any): void {
    const updatedAddress = { ...address, [key]: value };
    onChange(updatedAddress);
  }

  return (
    <Paper elevation={12} style={formStyle}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Dados de Entrega
      </Typography>
      <Divider />
      <Typography variant="h5" gutterBottom>
        Informações de Endereço
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Rua"
            fullWidth
            value={address.address}
            onChange={(e) => handleChangeForm("address", e.target.value || "")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Número"
            type="number"
            fullWidth
            value={address.addressNumber}
            onChange={(e) => handleChangeForm("addressNumber", e.target.value || "")}
            >
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="CEP"
            type="number"
            fullWidth
            value={address.cep}
            onChange={(e) => handleChangeForm("cep", e.target.value || "")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Bairro"
            fullWidth
            value={address.neighborhood}
            onChange={(e) => handleChangeForm("neighborhood", e.target.value || "")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Cidade"
            fullWidth
            value={address.city}
            onChange={(e) => handleChangeForm("city", e.target.value || "")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Estado"
            fullWidth
            value={address.state}
            onChange={(e) => handleChangeForm("state", e.target.value || "")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Telefone"
            type="number"
            fullWidth
            value={address.phoneNumber}
            onChange={(e) => handleChangeForm("phoneNumber", e.target.value || "")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Responsável"
            fullWidth
            value={address.responsible}
            onChange={(e) => handleChangeForm("responsible", e.target.value || "")}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
