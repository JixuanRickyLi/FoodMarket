import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../models/user.model';
import {ErrorModel} from '../../models/error.model';
import {Order} from '../../models/order.model';
import {MatDialog} from '@angular/material/dialog';
import {PayconfirmComponent} from './payconfirm/payconfirm.component';

@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrls: ['./buyer-orders.component.scss']
})
export class BuyerOrdersComponent implements OnInit {
  user: UserModel;
  errMsg: string;
  orderList: Order[];

  constructor(private orderService: OrderService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    if (this.orderService.orderList.length === 0) {
      this.orderService.listByBuyer(this.user.id).subscribe(response => {
        if (response.status === 'success' ) {
          this.orderService.orderList = response.data as Order[];
          this.orderList = this.orderService.orderList;
        } else {
          this.errMsg = (response.data as ErrorModel).errMsg;
        }
      });
    } else {
      this.orderList = this.orderService.orderList;
    }
    this.authService.userChanged.subscribe(user => {
      this.user = user;
      this.orderService.listByBuyer(this.user.id).subscribe(response => {
        if (response.status === 'success' ) {
          this.orderService.orderList = response.data as Order[];
          this.orderList = this.orderService.orderList;
        } else {
          this.errMsg = (response.data as ErrorModel).errMsg;
        }
      });
    });
  }

  confirmPay(amount: number, i: number) {
    const dialogRef = this.dialog.open(PayconfirmComponent, {
      width: '250px',
      data: amount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.pay(this.orderList[i].orderId).subscribe(
          () => {
            this.orderService.listByBuyer(this.user.id).subscribe(response => {
              if (response.status === 'success' ) {
                this.orderService.orderList = response.data as Order[];
                this.orderList = response.data as Order[];
              } else {
                this.errMsg = (response.data as ErrorModel).errMsg;
              }
            });
            this.orderService.listByOwner(this.user.id).subscribe(response => {
              if (response.status === 'success' ) {
                this.orderService.sellerOrderList = response.data as Order[];
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
