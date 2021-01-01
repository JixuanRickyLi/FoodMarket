export class OrderItem {
  constructor(public itemId: string,
              public orderId: string,
              public productId: string,
              public productName: string,
              public productPrice: number,
              public productDescription: string,
              public productImage: string,
              public quantity: number,
              public unit: string) {
  }
}
