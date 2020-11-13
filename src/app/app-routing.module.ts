import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './app-features/item-list/item-list.component';
import { ShoppingCartComponent } from './app-features/shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: '', component: ItemListComponent, data: { title: 'Price Component' } },
  { path: 'item', component: ItemListComponent, data: { title: 'Price Component' } },
  { path: 'calculator', component: ShoppingCartComponent, data: { title: 'Shopping Cart Component' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
