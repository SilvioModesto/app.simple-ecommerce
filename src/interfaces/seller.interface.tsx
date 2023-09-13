export interface ISeller {
  _id?: string;
  name:string;
}

export class ISellerHandler {
  static getProduct(data: any = {}): ISeller {
    return {
      _id: data._id,
      name: data.name,
    };
  }
}
