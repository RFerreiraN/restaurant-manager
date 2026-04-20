import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { Order } from 'src/app/core/models/order.model';
import { SOCKET_EVENTS } from 'src/app/core/constants/socket.event';
import { getNextStatus, getActionLabel } from 'src/app/core/constants/status_order'
import { OrderStatus } from 'src/app/core/types/order.status';
import { Role } from 'src/app/core/types/role.order';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})

export class KitchenComponent implements OnInit, OnDestroy {
  orders: Order[] = []
  role: Role = 'kitchen'

  async loadOrders() {
    const res = await fetch('http://localhost:3000/orders')
    this.orders = await res.json()
    console.log(this.orders)
  }

  changeStatus(orderId: string, status: OrderStatus | null) {
    console.log('Prueba', orderId, status)
    console.log(this.socketService)
    console.log('socket connected?', this.socketService['socket']?.connected)
    if (!status) return
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

  getActionLabel(role: Role, status: OrderStatus) {
    return getActionLabel(role, status)
  }

  getNextStatus(role: Role, status: OrderStatus) {
    return getNextStatus(role, status)
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
