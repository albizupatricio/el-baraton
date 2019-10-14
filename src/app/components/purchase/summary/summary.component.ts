import { Component, OnInit, Input } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() purchaseForm: FormGroup;
  
  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  public goToTab(nextTab: boolean){
    this.purchaseService.triggerTabUpdate(nextTab);
  }

}
