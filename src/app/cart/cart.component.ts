import { Component, OnInit } from '@angular/core';
import {CrudService} from '../shared/crud.service';
import {DataService} from '../shared/data.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartDetails= [];
  private _url = 'http://cart-api.semicolon.guru';

  constructor(private crudService: CrudService,
              private dataService: DataService) { }

  ngOnInit() {
    this.crudService.get(this._url + '/user/3/cart').subscribe(res => {
      this.cartDetails = res;
    });

    this.dataService.cartDetails.subscribe((newProducts) => {
      if (newProducts.length < 1) {
        return;
      }

      _.each(newProducts, (newProduct) => {
        const updateProduct: any = _.find(this.cartDetails, ['product.id', newProduct.id]);
        console.log(updateProduct);
         if (updateProduct) {
           const updateQuantity = updateProduct.quantity + 1;
          this.crudService.put(this._url + '/user/3/cart/' + updateProduct.id + '?quantity=' + updateQuantity )
            .subscribe((res) => {
            console.log(res);
            const index = _.findIndex(this.cartDetails, ['product.id', newProduct.id]);
            console.log(index);
            this.cartDetails.splice(index, 1, res.json());

            });
        } else {
           this.crudService.post(this._url + '/user/3/cart/product/' + newProduct.id + '?quantity=' + 1)
             .subscribe( (res) => {
               console.log(res);
               this.cartDetails.push(res.json());
               console.log(this.cartDetails);
             });
         }
      });
    });
  }

  modifyQuantity(cartProduct, value, index) {
    console.log(index);
    const quantity = cartProduct.quantity + value;
    this.crudService.put(this._url + '/user/3/cart/product/' + cartProduct.product.id + '?quantity=' + quantity)
      .subscribe( (res) => {
        console.log(res);
        this.cartDetails.splice(index, 1, res.json());
      });
  }

}
