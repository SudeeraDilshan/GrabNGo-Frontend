import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { OrderSummaryComponent } from './checkout-address/order-summary/order-summary.component';
import { CheckoutComponent } from './checkout-address/checkout/checkout.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { PaymentPortalComponent } from './checkout-payment/payment-portal/payment-portal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ResetPasswordComponent,
    EmailVerificationComponent,
    ProfileComponent,
    OrderHistoryComponent,
    ChangePasswordComponent,
    RegistrationComponent,
    CheckoutAddressComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    CheckoutPaymentComponent,
    PaymentPortalComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
