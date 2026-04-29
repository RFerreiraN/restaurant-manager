import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {

  orders: Order[] = []

  async loadOrders() {
    const res = await fetch('http://localhost:3000/orders')
    this.orders = await res.json()
    console.log(this.orders)
  }

  constructor() { }

  ngOnInit(): void {
    this.loadOrders()
  }
}
