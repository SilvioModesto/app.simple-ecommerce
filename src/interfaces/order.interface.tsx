import { EOrderStatus } from "@/enums";
import { IProduct } from "./product.interface";
import { EPaymentMethod } from "@/enums/payment-method.enum";
import { IBillingData, IBillingDataHandler } from "./billing-data.interface";
import { IAddressData, IAddressDataHandler } from "./address-data.interface";

export interface IOrder {
  _id?: string;
  userId?: string;
  products: IProduct[];
  deliveryData: IAddressData;
  billingData: IBillingData;
  paymentMethod: EPaymentMethod;
  status: EOrderStatus;
}

export class IOrderHandler {
  static empty(): IOrder {
    return {
      products: [],
      deliveryData: IAddressDataHandler.empty(),
      billingData: IBillingDataHandler.empty(),
      paymentMethod: EPaymentMethod.CASH,
      status: EOrderStatus.PENDING,
    };
  }
}
