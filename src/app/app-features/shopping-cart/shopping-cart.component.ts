import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
  
})
export class ShoppingCartComponent implements OnInit {
  itemList = [];

  cartForm = new FormGroup({
    itemListDropdown: new FormControl(''),
    isUnitsCheck: new FormControl('true'),
    qty: new FormControl(''),
    priceLabel: new FormControl(''),
  });

  constructor(
    public itemService: ItemService,
    public router: Router
  ) {
    this.getItems();
  }

  ngOnInit() {
  }

  /** Load all items */
  getItems() {
    this.itemService.getItems().subscribe((data) => {
      this.itemList = data;
      this.cartForm.controls.itemListDropdown.setValue(this.itemList[0].itemName);
    })
  }

  /** Get Price Relevent to QTY */
  generatePrice() {
    var itemName = this.cartForm.controls.itemListDropdown.value;
    var isUnit = this.cartForm.controls.isUnitsCheck.value;
    var qty = this.cartForm.controls.qty.value;

    var id;
    this.itemList.forEach(item => {
      if (item.itemName == itemName) {
        id = item.itemId;
      }
    });

    var order = {
      itemId: id,
      isUnit: isUnit,
      qty: qty
    }

    this.itemService.getPriceForItem(JSON.stringify(order)).subscribe((data) => {
      this.cartForm.controls.priceLabel.setValue(data.price);
    })
  }

  /** Generate the price when press Enter */
  keyDownFunction(event) {
    this.generatePrice();
  }
}
