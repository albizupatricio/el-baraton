import { Component, OnInit, Input } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { FormGroup, FormArray } from '@angular/forms';
import Swal from "sweetalert2";
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() purchaseForm: FormGroup;

  public cash: FormGroup;
  public card: FormGroup;
  public products: FormArray;

  constructor(private purchaseService: PurchaseService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cash = this.purchaseForm.controls.cash as FormGroup;
    this.card = this.purchaseForm.controls.card as FormGroup;
    this.products = this.purchaseForm.controls.products as FormArray;
  }


  public goToTab(nextTab: boolean) {
    this.purchaseService.triggerTabUpdate(nextTab);
  }

  public completePurchase() {
    Swal.fire(
      "Compra Exitosa",
      `${this.purchaseForm.controls.name.value} su compra fue exitosa.`,
      "success"
    ).finally(() => {
      this.cartService.purchaseCompleted();
      this.router.navigateByUrl('/home');
    });
  }

}
