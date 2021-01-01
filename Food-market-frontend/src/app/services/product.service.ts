import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ReturnModel} from '../models/return.model';
import {environment} from '../../environments/environment';
import {ProductModel} from '../models/product.model';
import {ProductCategoryVoModel} from '../models/product-category-vo.model';


@Injectable()
export class ProductService {

  sellerProducts: ProductModel[] = [];
  homePageProducts: ProductCategoryVoModel[] = [];
  product: ProductModel;

  constructor(private http: HttpClient) { }

  findById(productId: string) {
    let myParams = new HttpParams();
    myParams = myParams.append('productId', String(productId));
    return this.http
      .get<ReturnModel>(
        environment.baseUrl + environment.dish,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      );
  }

  createProduct(productModel: ProductModel) {
    return this.http
      .post<ReturnModel>(
        environment.baseUrl + environment.dish,
        productModel,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      );
  }

  updateProduct(productModel: ProductModel) {
    return this.http
      .put<ReturnModel>(
        environment.baseUrl + environment.dish,
        productModel,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      );
  }

  findAllCategory() {
    return this.http
      .get<ReturnModel>(
        environment.baseUrl + environment.category + environment.all,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      );
  }

  listAllForSale() {
    return this.http
      .get<ReturnModel>(
        environment.baseUrl + environment.dish + environment.all,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      );
  }

  listBySeller(ownerId: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('ownerId', String(ownerId));
    return this.http
      .get<ReturnModel>(
        environment.baseUrl + environment.dish + environment.listBySeller,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      );
  }
}
