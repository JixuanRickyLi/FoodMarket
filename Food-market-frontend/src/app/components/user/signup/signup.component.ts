import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {UserModel} from '../../../models/user.model';
import {ErrorModel} from '../../../models/error.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Order} from '../../../models/order.model';
import {ProductModel} from '../../../models/product.model';
import {OrderService} from '../../../services/order.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  user: UserModel;
  errMsg: string;

  constructor(private authService: AuthService,
              private orderService: OrderService,
              private productService: ProductService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  onSubmit(f: NgForm) {
    this.user = new UserModel(0, f.value.username, f.value.password, f.value.name,
      f.value.email, f.value.phone, f.value.address);
    this.authService.signup(this.user).subscribe(response => {
      if (response.status === 'success' ) {
        this.authService.user = response.data as UserModel;
        this.user = this.authService.user;
        this.authService.userChanged.next(this.user);
        this.orderService.listByBuyer(this.user.id).subscribe(response1 => {
          if (response1.status === 'success' ) {
            this.orderService.orderList = response1.data as Order[];
          } else {
            this.errMsg = (response1.data as ErrorModel).errMsg;
          }
        });
        this.orderService.listByOwner(this.user.id).subscribe(response2 => {
          if (response2.status === 'success' ) {
            this.orderService.sellerOrderList = response2.data as Order[];
          } else {
            this.errMsg = (response2.data as ErrorModel).errMsg;
          }
        });
        this.productService.listBySeller(this.authService.user.id).subscribe(response3 => {
          if (response3.status === 'success' ) {
            this.productService.sellerProducts = response3.data as ProductModel[];
          } else {
            this.errMsg = (response3.data as ErrorModel).errMsg;
          }
        });
        this.router.navigate(['/']).then();
        this.snackBar.open('New user created!', 'done', {
          duration: 2000,
        });
      } else {
        this.errMsg = (response.data as ErrorModel).errMsg;
      }
    });
  }
}
