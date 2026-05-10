import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitchenComponent } from './features/kitchen/kitchen.component';
import { WaiterComponent } from './features/waiter/waiter.component';
import { WaiterOptionsComponent } from './features/waiter-options/waiter-options.component';


const routes: Routes = [
  { path: 'cocina', component: KitchenComponent },
  { path: 'sala', component: WaiterComponent },
  { path: 'sala/mesas', component: WaiterOptionsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
