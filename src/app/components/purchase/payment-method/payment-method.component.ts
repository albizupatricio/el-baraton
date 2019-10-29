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
  public cash: FormGroup;
  public card: FormGroup;

  constructor(private purchaseService: PurchaseService) {
  }

  ngOnInit() {
    this.cash = this.purchaseForm.controls.cash as FormGroup;
    this.card = this.purchaseForm.controls.card as FormGroup;
    this.subs.push(
      this.purchaseForm.controls.cashPayment.valueChanges.subscribe((cash) => {
        if (cash) {
          this.cash.reset();
        } else {
          this.card.reset();
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
