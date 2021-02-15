import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/operator/map'
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";

import { Order, OrderItem} from './order.model'

import {MEAT_API} from '../app.api'

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: Http){ }

    cartItem(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    removeItem(item: CartItem){
        this.cartService.removeItem(item)
    }

    itemsValue(): number{
       return this.cartService.total()
    }

    clear(){
        this.cartService.clear()
      }

    checkOrder(order: Order): Observable<string>{
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        console.log('order service',order)
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers}))
        .map(reponse=>reponse.json())
        .map(order=>order.id)
        
    }
}