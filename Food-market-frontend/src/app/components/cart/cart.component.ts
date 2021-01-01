import {Component, Inject, OnInit} from '@angular/core';
import {OrderItem} from '../../models/order-item.model';
import {UserModel} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OrderFormModel} from '../../models/order-form.model';
import {ErrorModel} from '../../models/error.model';
import {Order} from '../../models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];
  user: UserModel;
  errMsg: string;

  constructor(private authService: AuthService,
              private orderService: OrderService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.orderItems = this.orderService.cartItems;
  }

  onSubmit(f: NgForm) {
    this.confirmPlaceOrder(f.value.name, f.value.phone, f.value.address, this.orderItems);
  }

  confirmPlaceOrder(buyerName: string, buyerPhone: string, buyerAddress: string, orderItems: OrderItem[]) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const orderForm = new OrderFormModel(this.user.id, buyerName, buyerPhone, buyerAddress, orderItems);
        this.orderService.createOrder(orderForm).subscribe(response => {
          if (response.status === 'success' ) {
            this.orderService.orderList.push(response.data as Order);
            this.orderItems = [];
            this.orderService.cartItems = [];
            this.orderService.itemNumberInCart = 0;
            this.orderService.cartChanged.next(this.orderService.itemNumberInCart);
            this.errMsg = null;
          } else {
            this.errMsg = (response.data as ErrorModel).errMsg;
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

