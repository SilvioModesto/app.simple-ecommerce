export interface IProduct {
  _id?: string;
  image?: string;
  label: string;
  price: number;
  quantity: number;
}

export class IProductHandler {
  static getProduct(data = {}): IProduct {
    return {
      label: '',
      price: 0,
      quantity: 1,
      ...data,
    };
  }
}
