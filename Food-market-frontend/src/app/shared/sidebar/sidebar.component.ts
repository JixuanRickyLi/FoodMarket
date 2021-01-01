import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  itemNumInCart = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.cartChanged.subscribe(itemNumInCart => {
      this.itemNumInCart = itemNumInCart;
    });
  }

}
