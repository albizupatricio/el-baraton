import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  public goToTab(nextTab: boolean){
    this.purchaseService.triggerTabUpdate(nextTab);
  }

}
