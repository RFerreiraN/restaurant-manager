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
    console.log('Prueba', orderId, status)
    console.log(this.socketService)
    console.log('socket connected?', this.socketService['socket']?.connected)
    this.socketService.emit('order:changeStatus', {
      orderId,
      status
    })
  }

  private initSocketListeners() {
    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_NEW, (order) => {
      console.log('Pedido recibido:', order)
      this.orders.unshift(order)
    })

    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_STATUS_CHANGED, (updatedOrder: Order) => {
      this.orders = this.orders.map(order => order._id === updatedOrder._id ? updatedOrder : order)
      console.log('evento recibido', updatedOrder)
    })
  }

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.loadOrders()
    this.initSocketListeners()
  }
}
