import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KitchenComponent } from './features/kitchen/kitchen.component';
import { WaiterComponent } from './features/waiter/waiter.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { TablesComponent } from './features/tables/tables.component';
import { WaiterOptionsComponent } from './features/waiter-options/waiter-options.component';

@NgModule({
  declarations: [
    AppComponent,
    KitchenComponent,
    WaiterComponent,
    NavbarComponent,
    TablesComponent,
    WaiterOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
