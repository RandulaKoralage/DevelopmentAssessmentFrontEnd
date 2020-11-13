import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  itemList = [];
  defualtItemId = 0;
  items = [];
  map = new Map<string, string>();

  constructor(
    public itemService: ItemService,
    public router: Router
  ) {
    this.getItems();
  }

  ngOnInit() {

  }

  itemForm = new FormGroup({
    itemListDropdown: new FormControl(''),
    unitsPerCarton: new FormControl(''),
    pricePerCarton: new FormControl(''),
  });

  /** Load all items */
  getItems() {
    this.itemService.getItems().subscribe((data) => {
      this.itemList = data;
      this.onItemChange(this.itemList[0].itemName);
    })
  }

  /** Onchange change the tabel */
  onItemChange(itemName: any) {
    var id;
    this.itemList.forEach(item => {
      if (item.itemName == itemName) {
        id = item.itemId;
      }
    });
    this.loadPriceList(id);
  }

  /**Store price list in a map */
  loadPriceList(id) {
    this.itemService.getItemsWithPrice(id).subscribe((data) => {

      this.itemForm.controls.unitsPerCarton.setValue(data.unitsPerCarton);
      this.itemForm.controls.pricePerCarton.setValue(data.pricePerCarton);

      for (var value in data.unitPrices) {
        this.map.set(value, data.unitPrices[value])
      }
    })
  }

  /**Order the map when display */
  asIsOrder(a, b) {
    return 1;
  }
}
