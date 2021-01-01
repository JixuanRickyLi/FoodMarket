import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {ErrorModel} from '../../models/error.model';
import {CategoryModel} from '../../models/category.model';
import {ProductModel} from '../../models/product.model';
import {MatSelectChange} from '@angular/material/select';
import {ProductService} from '../../services/product.service';
import {ProductCategoryVoModel} from '../../models/product-category-vo.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  user: UserModel;
  errMsg: string;
  categories: CategoryModel[];
  category: number;
  product: ProductModel;

  constructor(private authService: AuthService,
              private productService: ProductService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.authService.userChanged.subscribe(
      user => {
        this.user = user;
      }
    );
    this.productService.findAllCategory().subscribe( response => {
      if (response.status === 'success' ) {
        this.categories = response.data as CategoryModel[];
      } else {
        this.errMsg = (response.data as ErrorModel).errMsg;
      }
    });
  }

  onSubmit(f: NgForm) {
    const v = f.value;
    this.product = new ProductModel('', v.name, v.price, v.stock,
      v.description, v.image, 0, this.category, this.user.id);
    this.productService.createProduct(this.product).subscribe(response => {
      if (response.status === 'success' ) {
        this.productService.listAllForSale().subscribe( res => {
          if (res.status === 'success' ) {
            this.productService.homePageProducts = res.data as ProductCategoryVoModel[];
          } else {
            this.errMsg = (res.data as ErrorModel).errMsg;
          }
        });
        this.productService.listBySeller(this.authService.user.id).subscribe(response2 => {
          if (response2.status === 'success' ) {
            this.productService.sellerProducts = response2.data as ProductModel[];
            this.router.navigate(['/sellerproducts']).then();
          } else {
            this.errMsg = (response2.data as ErrorModel).errMsg;
          }
        });
        this.snackBar.open('New dish created!', 'done', {
          duration: 4000,
        });
      } else {
        this.errMsg = (response.data as ErrorModel).errMsg;
      }
    });
  }

  change($event: MatSelectChange) {
    this.category = $event.value;
  }

}
