import { Component } from '@angular/core';

@Component({
  selector: 'app-waiter-sidebar',
  templateUrl: './waiter-sidebar.component.html',
  styleUrls: ['./waiter-sidebar.component.css']
})
export class WaiterSidebarComponent {
  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
