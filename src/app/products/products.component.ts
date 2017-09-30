import { Component, OnInit } from '@angular/core';
import {CrudService} from '../shared/crud.service';
import {DataService} from '../shared/data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any;

  constructor(private crudService: CrudService,
              private dataService: DataService) { }

  ngOnInit() {
    this.crudService.get('http://cart-api.semicolon.guru/product').subscribe(res => {
      this.products = res;
    });
  }

  updateCart() {
    this.dataService.cartDetails.next(_.filter(this.products, 'selected'));
  }

}
