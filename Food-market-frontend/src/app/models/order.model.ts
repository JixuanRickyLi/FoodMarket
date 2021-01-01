import {OrderItem} from './order-item.model';

export class Order {
  constructor(public orderId: string,
              public buyerId: number,
              public buyerName: string,
              public buyerPhone: string,
              public buyerAddress: string,
              public orderAmount: number,
              public orderStatus: number,
              public payStatus: number,
              public createTime: string,
              public updateTime: string,
              public orderItemVOList: OrderItem[]) {
  }
}
