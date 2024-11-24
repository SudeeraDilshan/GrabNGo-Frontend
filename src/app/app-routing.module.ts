import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { ProductAddComponent } from './product-crud/product-add/product-add.component';
import { ProductEditComponent } from './product-crud/product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-crud/product-delete/product-delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/productAdmin', pathMatch: 'full' },
  { path: 'productAdmin', component: ProductAdminComponent},
  { path: 'category', component: CategoryViewAdminComponent },
  { path: 'productAdd', component:ProductAddComponent},
  { path: 'productEdit', component: ProductEditComponent},
  { path: 'productDelete', component:ProductDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
