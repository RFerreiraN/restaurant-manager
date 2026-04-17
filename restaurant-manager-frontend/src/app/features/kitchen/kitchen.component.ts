import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { Order } from 'src/app/core/models/order.model';
import { SOCKET_EVENTS } from 'src/app/core/constants/socket.event';
import { STATUS_LABELS, NEXT_STATUS } from 'src/app/core/constants/status_order';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit, OnDestroy {
  orders: Order[] = []

  next_status?: NEXT_STATUS[]

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


  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.loadOrders()
    this.initSocketListeners()
  }

  ngOnDestroy(): void {
    this.socketService.off(SOCKET_EVENTS.ORDER_NEW, this.newOrderHandler)
    this.socketService.off(SOCKET_EVENTS.ORDER_STATUS_CHANGED, this.statusHandler)
  }

}
