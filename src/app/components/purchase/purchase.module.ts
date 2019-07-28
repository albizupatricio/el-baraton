import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { purchaseRoutes } from './purchase.routes';
import { CartComponent } from './cart/cart.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [
    PurchaseComponent,
    CartComponent,
    PaymentMethodComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(purchaseRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PurchaseModule { }
