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

  static getTotal( products: IProduct[]): number {
    return products
    .map((p) => p.price * (p.quantity || 0))
    .reduce((accumulator, currValue) => accumulator + currValue, 0);
  }
}
