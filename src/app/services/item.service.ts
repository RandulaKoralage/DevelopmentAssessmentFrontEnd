import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Item } from '../models/item';
import { map, catchError } from 'rxjs/operators';
import { OrderPrice } from '../models/order-price';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiURL = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    })
  }

  /** Get all items */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiURL + '/items')
      .pipe(
        map((data: Item[]) => {
          if (!data) {
            var item = {
              itemId: 0,
              itemName: "None",
              unitsPerCarton: 0,
              pricePerCarton: 0,
              unitPrices: null
            }
            data.push(item);
          }
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  /** Get first 50 unit prices */
  getItemsWithPrice(id: any): Observable<Item> {
    return this.http.get<Item>(this.apiURL + '/price_list?id=' + id)
      .pipe(
        map((data: Item) => {
          if (!data) {
            data = {
              itemId: 0,
              itemName: "None",
              unitsPerCarton: 0,
              pricePerCarton: 0,
              unitPrices: null
            }
          }
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  /** Price for given qty*/
  getPriceForItem(order: any): Observable<OrderPrice> {
    return this.http.post<any>(this.apiURL + '/price', order, this.httpOptions)
      .pipe(
        map((data: OrderPrice) => {
          if (!data) {
            data = {
              itemId: 0,
              price: 0.0
            }
          }
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

}


