import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalConstants } from '../../app.constants';
import { PurchaseService } from './purchase.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  public tab: number;
  public tabEnabled: Array<boolean>;
  private subs: Subscription[];

  constructor(private globalConstants: GlobalConstants, private purchaseService: PurchaseService) { 
    this.tab = this.globalConstants.tabs.cart;
    this.tabEnabled = [true, false, false];
    this.subs = [];
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
