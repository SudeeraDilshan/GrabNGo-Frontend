import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
