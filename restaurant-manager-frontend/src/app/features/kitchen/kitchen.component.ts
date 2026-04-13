import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { Order } from 'src/app/core/models/order.model';
import { SOCKET_EVENTS } from 'src/app/core/constants/socket.event';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  orders: Order[] = []

  async loadOrders() {
    const res = await fetch('http://localhost:3000/orders')
    this.orders = await res.json()
    console.log(this.orders)
  }

  changeStatus(orderId: string, status: string) {
    this.socketService.emit(SOCKET_EVENTS.ORDER_STATUS_CHANGED, {
      orderId,
      status
    })
  }

  private listenersInitialized = false

  private initSocketListeners() {
    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_NEW, (order) => {
      console.log('Pedido recibido:', order)
      this.orders.unshift(order)
    })

    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_STATUS_CHANGED, (updatedOrder: Order) => {
      this.orders = this.orders.map(order => order._id === updatedOrder._id ? updatedOrder : order)
    })
  }

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.loadOrders()

    this.socketService.connected$.subscribe(connected => {
      if (!connected || this.listenersInitialized) return

      this.initSocketListeners()
      this.listenersInitialized = true
    })
  }
}
