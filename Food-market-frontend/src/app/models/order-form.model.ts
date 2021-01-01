import {OrderItem} from './order-item.model';

export class OrderFormModel {
  constructor(public buyerId: number,
              public buyerName: string,
              public buyerPhone: string,
              public buyerAddress: string,
              public items: OrderItem[]) {
  }
}
