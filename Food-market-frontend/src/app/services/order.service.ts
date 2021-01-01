import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ReturnModel} from '../models/return.model';
import {environment} from '../../environments/environment';
import {OrderFormModel} from '../models/order-form.model';
import {Subject} from 'rxjs';
import {ProductVoModel} from '../models/product-vo.model';
import {OrderItem} from '../models/order-item.model';
import {Order} from '../models/order.model';

@Injectable()
export class OrderService {

  cartChanged = new Subject<number>();
  cartItems: OrderItem[] = [];
  itemNumberInCart = 0;
  orderList: Order[] = [];
  sellerOrderList: Order[] = [];

  constructor(private http: HttpClient) { }

  listByBuyer(buyerId: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('buyerId', String(buyerId));
    return this.http
      .get<ReturnModel>(
        environment.baseUrl + environment.order + environment.listByBuyer,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
          params: myParams
        }
      );
  }

  listByOwner(ownerId: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('ownerId', String(ownerId));
    return this.http
      .get<ReturnModel>(
        environment.baseUrl + environment.order + environment.listByOwner,
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
          params: myParams
        }
      );
  }

  createOrder(orderFormModel: OrderFormModel) {
    let myParams = new HttpParams();
    myParams = myParams.append('buyerId', String(orderFormModel.buyerId));
    myParams = myParams.append('buyerName', orderFormModel.buyerName);
    myParams = myParams.append('buyerPhone', orderFormModel.buyerPhone);
    myParams = myParams.append('buyerAddress', orderFormModel.buyerAddress);
    myParams = myParams.append('items', JSON.stringify(orderFormModel.items));
    return this.http
      .post<ReturnModel>(
        environment.baseUrl + environment.order,
        {},
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      );
  }

  addToCart(productVoModel: ProductVoModel) {
    let exist = false;
    if (this.cartItems.length > 0) {
      for (const orderItem of this.cartItems) {
        if (orderItem.productId === productVoModel.productId) {
          orderItem.quantity++;
          exist = true;
        }
      }
    }
    if (!exist) {
      const order = new OrderItem(null, null, productVoModel.productId,
        productVoModel.productName, productVoModel.productPrice, productVoModel.productDescription,
        productVoModel.productImage, 1, 'piece');
      this.cartItems.push(order);
    }
    this.itemNumberInCart++;
    this.cartChanged.next(this.itemNumberInCart);
  }

  pay(orderId: string) {
    let myParams = new HttpParams();
    myParams = myParams.append('orderId', orderId);
    return this.http
      .put<ReturnModel>(
        environment.baseUrl + environment.order + environment.pay,
        {},
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
          params: myParams
        }
      );
  }

  finish(orderId: string) {
    let myParams = new HttpParams();
    myParams = myParams.append('orderId', orderId);
    return this.http
      .put<ReturnModel>(
        environment.baseUrl + environment.order + environment.finish,
        {},
        {
          headers: new HttpHeaders({ withCredentials: 'true'}),
          params: myParams
        }
      );
  }
}
