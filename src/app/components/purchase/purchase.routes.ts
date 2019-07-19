import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PurchaseComponent } from './purchase.component';

export const purchaseRoutes: Routes = [
    { path: 'cart', component: CartComponent},
    { path: 'paymentMethod', component: PaymentMethodComponent},
    { path: '', component: PurchaseComponent}
];
