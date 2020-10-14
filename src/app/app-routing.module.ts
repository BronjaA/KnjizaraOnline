import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './komponente/home/home.component';
import { ProductListComponent } from './komponente/product-list/product-list.component';
import { LoginComponent } from './komponente/login/login.component';
import { OnamaComponent } from './komponente/onama/onama.component';
import { ProductComponent } from './komponente/product/product.component';
import { KontaktComponent } from './komponente/kontakt/kontakt.component';
import { CheckoutComponent } from './komponente/checkout/checkout.component';
import { ProfileComponent } from './komponente/profile/profile.component';
import { AuthguardGuard } from './authguard.guard';
import { AdminPanelComponent } from './komponente/admin-panel/admin-panel.component';
import { ShellComponent } from './shell/shell.component';
import { AppComponent } from './app.component';
import { CartComponent } from './komponente/cart/cart.component';
import { ProdajComponent } from './komponente/prodaj/prodaj.component';
import { AdminGuardGuard } from './admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'pl', component: ProductListComponent},
      {path: 'login', component: LoginComponent},
      {path: 'o-nama', component: OnamaComponent},
      {path: 'product/:productId', component: ProductComponent},
      {path: 'kontakt', component: KontaktComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthguardGuard]},
      {path: 'cart', component: CartComponent},
      {path: 'prodaj-knjigu', component: ProdajComponent}
    ]
  },
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
    canActivate: [AdminGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
