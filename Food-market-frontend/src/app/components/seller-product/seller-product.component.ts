import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductModel} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {AuthService} from '../../services/auth.service';
import {ProductCategoryVoModel} from '../../models/product-category-vo.model';
import {ErrorModel} from '../../models/error.model';
import {UserModel} from '../../models/user.model';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   image: number;
//   price: string;
//   stock: string;
//   description: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'fish', image: 3, price: '4.0', description: 'yumy', stock: '3'},
//   {position: 2, name: 'bird', image: 6, price: '7.0', description: 'eh', stock: '0'}
// ];

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss']
})
export class SellerProductComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'image', 'price', 'description', 'stock', 'modify', 'outofstock'];
  // dataSource = ELEMENT_DATA;

  productModels: ProductModel[] = [];
  errMsg: string;

  constructor(private router: Router,
              private authService: AuthService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.authService.userChanged.subscribe(
      () => {
        this.productService.listBySeller(this.authService.user.id).subscribe(response => {
          if (response.status === 'success' ) {
            this.productService.sellerProducts = response.data as ProductModel[];
            this.productModels = this.productService.sellerProducts;
          } else {
            this.errMsg = (response.data as ErrorModel).errMsg;
          }
        });
      }
    );
    if (this.productService.sellerProducts.length === 0) {
      this.productService.listBySeller(this.authService.user.id).subscribe(response => {
        if (response.status === 'success' ) {
          this.productService.sellerProducts = response.data as ProductModel[];
          this.productModels = this.productService.sellerProducts;
        } else {
          this.errMsg = (response.data as ErrorModel).errMsg;
        }
      });
    } else {
      this.productModels = this.productService.sellerProducts;
    }
  }

  createProduct() {
    this.router.navigate(['/addproduct']).then();
  }

  confirmDelete(i: number) {

  }

  editProduct(product: ProductModel) {
    this.productService.findById(product.productId).subscribe(response => {
      if (response.status === 'success' ) {
        this.productService.product = response.data as ProductModel;
        this.router.navigate(['/editproduct']).then();
      } else {
        this.errMsg = (response.data as ErrorModel).errMsg;
      }
    });
  }
}
