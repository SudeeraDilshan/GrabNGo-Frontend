import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { ProductAddComponent } from './product-crud/product-add/product-add.component';
import { ProductEditComponent } from './product-crud/product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-crud/product-delete/product-delete.component';
import { CategoryCrudComponent } from './category-crud/category-crud.component';
import { CategoryAddComponent } from './category-crud/category-add/category-add.component';
import { CategoryEditComponent } from './category-crud/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './category-crud/category-delete/category-delete.component';
import { OrderViewAdminComponent } from './order-view-admin/order-view-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductAdminComponent,
    CategoryViewAdminComponent,
    ProductCrudComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    CategoryCrudComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
    OrderViewAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
