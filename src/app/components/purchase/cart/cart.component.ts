import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  public goToTab(){
    this.purchaseService.triggerTabUpdate(true);
  }

}
