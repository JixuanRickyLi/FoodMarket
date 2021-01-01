import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {Order} from '../../models/order.model';
import {OrderService} from '../../services/order.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ErrorModel} from '../../models/error.model';
import {PayconfirmComponent} from '../buyer-orders/payconfirm/payconfirm.component';
import {FinishconfirmComponent} from './finishconfirm/finishconfirm.component';

@Component({
  selector: 'app-seller-order',
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.scss']
})
export class SellerOrderComponent implements OnInit {
  user: UserModel;
  errMsg: string;
  sellerOrderList: Order[];

  constructor(private orderService: OrderService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    if (this.orderService.sellerOrderList.length === 0) {
      this.refreshSellerOrderList();
    } else {
      this.sellerOrderList = this.orderService.sellerOrderList;
    }
    this.authService.userChanged.subscribe(user => {
      this.user = user;
      this.refreshSellerOrderList();
    });
  }

  refreshSellerOrderList(): void {
    this.orderService.listByOwner(this.user.id).subscribe(response => {
      if (response.status === 'success' ) {
        this.orderService.sellerOrderList = response.data as Order[];
        this.sellerOrderList = this.orderService.sellerOrderList;
      } else {
        this.errMsg = (response.data as ErrorModel).errMsg;
      }
    });
  }

  confirmFinish(amount: number, i: number) {
    const dialogRef = this.dialog.open(FinishconfirmComponent, {
      width: '250px',
      data: amount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.finish(this.sellerOrderList[i].orderId).subscribe(
          () => {
            this.orderService.listByBuyer(this.user.id).subscribe(response => {
              if (response.status === 'success' ) {
                this.orderService.orderList = response.data as Order[];
              } else {
                this.errMsg = (response.data as ErrorModel).errMsg;
              }
            });
            this.orderService.listByOwner(this.user.id).subscribe(response => {
              if (response.status === 'success' ) {
                this.orderService.sellerOrderList = response.data as Order[];
                this.sellerOrderList = response.data as Order[];
              } else {
                this.errMsg = (response.data as ErrorModel).errMsg;
              }
            });
          }
        );
      }
    });
  }

}
