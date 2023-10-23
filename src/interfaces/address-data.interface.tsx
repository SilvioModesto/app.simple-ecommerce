export interface IAddressData {
  address: string;
  addressNumber: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
  phoneNumber: string;
  responsible: string;
}

export class IAddressDataHandler {
  static empty(): IAddressData {
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