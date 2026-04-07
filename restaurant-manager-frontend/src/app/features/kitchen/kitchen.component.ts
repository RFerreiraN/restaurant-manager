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

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.connect('test-token')

    this.loadOrders()

    this.socketService.on<Order>(SOCKET_EVENTS.ORDER_NEW, (order) => {
      console.log('Pedido recibido:', order)
      this.orders.unshift(order)
    })
  }
}
