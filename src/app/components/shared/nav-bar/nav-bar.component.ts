import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartService } from '../../purchase/cart/cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Input() cartVisible: boolean;

  public productsQuantity: number;
  private subs: Subscription[];

  constructor(private cartService: CartService) { 
    this.productsQuantity = 0;
    this.subs = [];
  }

  ngOnInit() {
    this.productsQuantity = this.cartService.getSavedProductsQuantity();
    this.subs.push(this.cartService.getCounterUpdate().subscribe((adding: boolean)=>{
      if(adding){
        this.productsQuantity += 1;
      }else{
        this.productsQuantity -= 1;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
