import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 2;
  lowValue: number = 0;
  highValue: number = 2;
  pageEvent;

  products;
  prods; //derived array


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe((products: any[]) => {
      this.products = products;
      for (const products in this.products) {
        if (Object.prototype.hasOwnProperty.call(this.products, products)) {
          this.prods = this.products[products];
        }
      }
    })
  }

  getPaginatorData(event) {
    console.log(event);
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }


}
