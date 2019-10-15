import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  @Input() purchaseForm: FormGroup;

  private subs: Subscription[] = [];

  constructor(private purchaseService: PurchaseService) {
  }

  ngOnInit() {
    this.subs.push(
      this.purchaseForm.controls.cashPayment.valueChanges.subscribe((cash) => {
        if (cash) {
          this.purchaseForm.controls.cash.reset();
        } else {
          this.purchaseForm.controls.card.reset();
        }
      })
    );
  }

  public goToTab(nextTab: boolean) {
    this.purchaseService.triggerTabUpdate(nextTab);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
