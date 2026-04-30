import { Component, OnDestroy, OnInit } from '@angular/core';
import { SOCKET_EVENTS } from 'src/app/core/constants/socket.event';
import { Order } from 'src/app/core/models/order.model';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit, OnDestroy {

  orders: Order[] = []

  async loadOrders() {
    const res = await fetch('http://localhost:3000/orders')
    this.orders = await res.json()
    console.log(this.orders)
  }

  private statusHandler = (updateOrder: Order) => {
    this.orders = this.orders.map(order => order._id === updateOrder._id ? updateOrder : order)
    console.log('evento recibido', updateOrder)
  }

  private newOrderHandler = (order: Order) => {
    console.log('Pedido recibido:', order)
    this.orders.unshift(order)
  }

  private initSocketListeners() {
    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_NEW, this.newOrderHandler)
    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_STATUS_CHANGED, this.statusHandler)
  }

  constructor(private socketService: SocketService) {

  }

  ngOnInit(): void {
    this.loadOrders()
    this.initSocketListeners()
  }

  ngOnDestroy(): void {
    this.socketService.off<Order>(SOCKET_EVENTS.ORDER_NEW, this.newOrderHandler)
    this.socketService.off<Order>(SOCKET_EVENTS.ORDER_STATUS_CHANGED, this.statusHandler)
  }
}
