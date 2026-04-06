import { Component, OnInit } from '@angular/core';
import { SocketService } from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.connect('test-token')

    this.socketService.on('order:new', (data) => {
      console.log(' Nueva Orden:', data)
    })
  }
}
