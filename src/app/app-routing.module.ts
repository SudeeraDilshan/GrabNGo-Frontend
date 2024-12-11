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
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';

import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { FilterResultsComponent } from './filter-results/filter-results.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { loginRequiredGuard } from "./guards/login-required.guard";
import {PasswordModificationComponent} from "./password-modification/password-modification.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'productAdmin',
        component: ProductAdminComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'category',
        component: CategoryViewAdminComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'orderAdmin',
        component: OrderViewAdminComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'productAdd',
        component: ProductAddComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'productEdit/:id',
        component: ProductEditComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'productDelete',
        component: ProductDeleteComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'categoryAdd',
        component: CategoryAddComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'categoryEdit/:id',
        component: CategoryEditComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'categoryDelete',
        component: CategoryDeleteComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'auth/login',
        component: LoginComponent,
    },
    {
        path: 'auth/reset-password',
        component: ResetPasswordComponent,
    },
    {
        path: 'auth/email-verify',
        component: EmailVerificationComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'order-history',
        component: OrderHistoryComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'auth/change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [loginRequiredGuard]
    },
  {
    path: 'password-modification',
    component: PasswordModificationComponent,
  },
    {
        path: 'auth/registration',
        component: RegistrationComponent
    },
    {
        path: 'checkout-address',
        component: CheckoutAddressComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'checkout-payment',
        component: CheckoutPaymentComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'products',
        component: ProductListComponent,
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'filter',
        component: FilterResultsComponent
    },
    {
        path: 'product/:productId',
        component: ProductComponent
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path: 'product-overview',
        component: ProductOverviewComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
