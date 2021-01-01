export class ProductVoModel {
  constructor(public productId: string,
              public productName: string,
              public productPrice: number,
              public productStock: number,
              public productDescription: string,
              public productImage: string) {
  }
}
