import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', component: AppComponent },           
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],   
  exports: [RouterModule]                    
})
export class AppRoutingModule { }
