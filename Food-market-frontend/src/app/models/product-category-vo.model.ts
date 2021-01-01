import {ProductVoModel} from './product-vo.model';

export class ProductCategoryVoModel {
  constructor(public typeName: string,
              public typeNumber: number,
              public productVOList: ProductVoModel[]) {
  }
}
