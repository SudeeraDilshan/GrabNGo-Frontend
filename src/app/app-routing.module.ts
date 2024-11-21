import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { ProductAddComponent } from './product-crud/product-add/product-add.component';

const routes: Routes = [
  { path: 'productAdmin', component: ProductAdminComponent},
  { path: 'category', component: CategoryViewAdminComponent },
  { path: 'productAdd', component:ProductAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
