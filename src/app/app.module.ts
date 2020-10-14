import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigacijaComponent } from './komponente/navigacija/navigacija.component';
import { HomeComponent } from './komponente/home/home.component';
import { ProductListComponent } from './komponente/product-list/product-list.component';
import { LoginComponent } from './komponente/login/login.component';
import { FooterComponent } from './komponente/footer/footer.component';
import { from } from 'rxjs';
import { LoginCComponent } from './komponente/login-c/login-c.component';
import { RegisterCComponent } from './komponente/register-c/register-c.component';
import { ProductComponent } from './komponente/product/product.component';
import { OnamaComponent } from './komponente/onama/onama.component';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './komponente/kontakt/kontakt.component';
import { CheckoutComponent } from './komponente/checkout/checkout.component';
import { ProfileComponent } from './komponente/profile/profile.component';
import { BgService } from './servisi/bg.service';
import { AdminPanelComponent } from './komponente/admin-panel/admin-panel.component';
import { ShellComponent } from './shell/shell.component';
import { AuthguardGuard } from './authguard.guard';
import { CartComponent } from './komponente/cart/cart.component';
import { ProdajComponent } from './komponente/prodaj/prodaj.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    HomeComponent,
    ProductListComponent,
    LoginComponent,
    FooterComponent,
    LoginCComponent,
    RegisterCComponent,
    ProductComponent,
    OnamaComponent,
    KontaktComponent,
    CheckoutComponent,
    ProfileComponent,
    AdminPanelComponent,
    ShellComponent,
    CartComponent,
    ProdajComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
