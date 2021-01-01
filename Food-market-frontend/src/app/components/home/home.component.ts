import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductCategoryVoModel} from '../../models/product-category-vo.model';
import {ErrorModel} from '../../models/error.model';
import {ProductVoModel} from '../../models/product-vo.model';
import {OrderService} from '../../services/order.service';
import {MatDialog} from '@angular/material/dialog';
import {OrderFormModel} from '../../models/order-form.model';
import {DeleteDialogComponent} from '../cart/cart.component';
import {ProductInfoComponent} from './product-info/product-info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductCategoryVoModel[] = [];
  errMsg: string;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.productService.homePageProducts.length === 0) {
      this.productService.listAllForSale().subscribe( response => {
        if (response.status === 'success' ) {
          this.productService.homePageProducts = response.data as ProductCategoryVoModel[];
          this.products = this.productService.homePageProducts;
        } else {
          this.errMsg = (response.data as ErrorModel).errMsg;
        }
      });
    } else {
      this.products = this.productService.homePageProducts;
    }
  }

  addToCart(i: number, j: number, productVO: ProductVoModel) {
    this.products[i].productVOList[j].productStock--;
    this.orderService.addToCart(productVO);
  }

  productInfo(productVO: ProductVoModel) {
    this.dialog.open(ProductInfoComponent, {
      width: '500px',
      data: productVO
    });
  }
}
