import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/operator/map'
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";

import { Order, OrderItem} from './order.model'

import {MEAT_API} from '../app.api'

import { LoginService } from '../security/login/login.service'

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient, private loginService: LoginService){ }

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
        let headers = new HttpHeaders()
       
        if( this.loginService.isLoggedIn()){
            headers = headers.set('authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})        
        .map(order=>order.id)
        
    }
}