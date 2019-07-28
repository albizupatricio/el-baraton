import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  public goToTab(nextTab: boolean){
    this.purchaseService.triggerTabUpdate(nextTab);
  }

}
