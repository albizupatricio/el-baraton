import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalConstants } from '../../app.constants';
import { PurchaseService } from './purchase.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  public tab: number;
  public tabEnabled: Array<boolean>;
  private subs: Subscription[];
  public purchaseForm: FormGroup;

  constructor(private globalConstants: GlobalConstants, 
              private purchaseService: PurchaseService,
              private fb: FormBuilder) { 
    this.tab = this.globalConstants.tabs.cart;
    this.tabEnabled = [true, false, false];
    this.subs = [];
    this.purchaseForm = this.fb.group({
      products: this.fb.array([]),
      totalPrice: [0],
      cashPayment: [true],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      cash: this.fb.group({
        store: ['', Validators.required]
      }),
      card: this.fb.group({
        address: ['', Validators.required],
        cardNumber: ['', Validators.required],
        phone: ['', Validators.required]
      }),
    });
  }

  ngOnInit() {
    this.subs.push(this.purchaseService.getTabUpdate().subscribe((nextTab: boolean)=>{
      if(nextTab && this.tab < this.tabEnabled.length - 1 && !this.tabEnabled[this.tab + 1]){
        this.tabEnabled[this.tab + 1] = true;
      }
      if(nextTab){
        this.selectTab(this.tab + 1);
      }else{
        this.selectTab(this.tab - 1);
      }
    }),
    this.purchaseService.getEmptyCart().subscribe(()=>{
        this.tabEnabled = [true, false, false];
      }
    ));
  }

  public selectTab(tab: number){
    if(this.tabEnabled[tab]){
      this.tab = tab;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
