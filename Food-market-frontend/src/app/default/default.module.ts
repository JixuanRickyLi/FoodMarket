import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { DefaultComponent } from './default.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from '../components/user/login/login.component';
import { SignupComponent } from '../components/user/signup/signup.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HomeComponent } from '../components/home/home.component';
import {CategoryComponent} from '../components/category/category.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FlexModule} from '@angular/flex-layout';
import { PasswordComponent } from '../components/user/password/password.component';
import {AuthService} from '../services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from '../components/user/profile/profile.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BuyerOrdersComponent } from '../components/buyer-orders/buyer-orders.component';
import {OrderService} from '../services/order.service';
import {MatListModule} from '@angular/material/list';
import {OrderstatusPipe} from '../pipes/orderstatus.pipe';
import { SellerProductComponent } from '../components/seller-product/seller-product.component';
import {MatTableModule} from '@angular/material/table';
import { AddProductComponent } from '../components/add-product/add-product.component';
import {MatSelectModule} from '@angular/material/select';
import {ProductService} from '../services/product.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {CartComponent, DeleteDialogComponent} from '../components/cart/cart.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductInfoComponent } from '../components/home/product-info/product-info.component';
import { PayconfirmComponent } from '../components/buyer-orders/payconfirm/payconfirm.component';
import {PaystatusPipe} from '../pipes/paystatus.pipe';
import { ProductEditComponent } from '../components/product-edit/product-edit.component';
import {ProductstatusPipe} from '../pipes/productstatus.pipe';
import { SellerOrderComponent } from '../components/seller-order/seller-order.component';
import { FinishconfirmComponent } from '../components/seller-order/finishconfirm/finishconfirm.component';




@NgModule({
  declarations: [
    DefaultComponent,
    DeleteDialogComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CategoryComponent,
    PasswordComponent,
    ProfileComponent,
    BuyerOrdersComponent,
    OrderstatusPipe,
    PaystatusPipe,
    ProductstatusPipe,
    SellerProductComponent,
    AddProductComponent,
    CartComponent,
    ProductInfoComponent,
    PayconfirmComponent,
    ProductEditComponent,
    SellerOrderComponent,
    FinishconfirmComponent
  ],
  imports: [
    MatTableModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    FlexModule,
    HttpClientModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    OrderService,
    ProductService,
    // AuthGuardService,
    DatePipe
  ],
})
export class DefaultModule { }
