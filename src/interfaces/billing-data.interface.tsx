export interface IBillingData {
  address: string;
  addressNumber: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
  phoneNumber: string;
  responsible: string;
}

export class IBillingDataHandler {
  static empty(): IBillingData {
    return {
      address: '',
      addressNumber: '',
      cep: '',
      neighborhood: '',
      city: '',
      state: '',
      phoneNumber: '',
      responsible: '',
    };
  }
}