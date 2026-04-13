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

  role?: string | null


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.role = params.get('role')

      if (!this.role) {
        console.error('Role not found in url')
        return
      }


      console.log('role of url: ', this.role)

      this.socketService.connect(this.role)
    })
  }
}
