import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { FilterResultsComponent } from './filter-results/filter-results.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
const routes: Routes = [
    { path: 'cart', component:CartComponent},   
    { path: 'img', component: ProductListComponent },
    { path: 'product', component: ProductComponent },
   { path: 'filter', component:FilterResultsComponent},
   { path: 'product', component:ProductComponent},
   { path: 'product/:id', component: ProductComponent },
   {path:'shopping-cart',component:ShoppingCartComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
