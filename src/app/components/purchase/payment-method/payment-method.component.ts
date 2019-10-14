import { Component, OnInit, Input } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  @Input() purchaseForm: FormGroup;

  public totalPriceCtrl: FormControl;
  
  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.totalPriceCtrl = this.purchaseForm.get('totalPrice') as FormControl;  
  }

  public goToTab(nextTab: boolean){
    this.purchaseService.triggerTabUpdate(nextTab);
  }

}
