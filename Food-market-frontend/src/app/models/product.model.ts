export class ProductModel {
  constructor(public productId: string,
              public productName: string,
              public productPrice: number,
              public productStock: number,
              public productDescription: string,
              public productImage: string,
              public productStatus: number,
              public category: number,
              public productOwnerId: number) {
  }
}
