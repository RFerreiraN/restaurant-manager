import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KitchenComponent } from './features/kitchen/kitchen.component';
import { WaiterComponent } from './features/waiter/waiter.component';
import { WaiterSidebarComponent } from './features/waiter-sidebar/waiter-sidebar.component';
import { NavbarComponent } from './features/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    KitchenComponent,
    WaiterComponent,
    WaiterSidebarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
