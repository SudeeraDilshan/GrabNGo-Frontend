import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { ProductAddComponent } from './product-crud/product-add/product-add.component';
import { ProductEditComponent } from './product-crud/product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-crud/product-delete/product-delete.component';
import { CategoryAddComponent } from './category-crud/category-add/category-add.component';
import { CategoryEditComponent } from './category-crud/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './category-crud/category-delete/category-delete.component';
import { OrderViewAdminComponent } from './order-view-admin/order-view-admin.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';


const routes: Routes = [
  { path: '', redirectTo: '/productAdmin', pathMatch: 'full' },
  { path: 'productAdmin', component: ProductAdminComponent},
  { path: 'category', component: CategoryViewAdminComponent },
  { path: 'orderAdmin', component: OrderViewAdminComponent},
  { path: 'productAdd', component:ProductAddComponent},
  { path: 'productEdit/:id', component: ProductEditComponent},
  { path: 'productDelete', component:ProductDeleteComponent},
  { path: 'categoryAdd', component: CategoryAddComponent},
  { path: 'categoryEdit/:id', component: CategoryEditComponent},
  { path: 'categoryDelete', component: CategoryDeleteComponent},

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'email-verify',
    component: EmailVerificationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: 'order-history',
    component: OrderHistoryComponent
  },
  { path: 'change-password',
    component: ChangePasswordComponent
  },
  { path: 'registration',
    component: RegistrationComponent
  },
  { path: 'checkout-address',
    component: CheckoutAddressComponent
  },
  { path: 'checkout-payment',
    component: CheckoutPaymentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
