import { Component, OnInit } from '@angular/core';
import { SocketService } from './core/services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.socketService.connect('kitchen')
  }
}
