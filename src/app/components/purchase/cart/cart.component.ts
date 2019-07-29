import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { SelectedProduct } from 'src/app/models/selectedProduct';
import { CartService } from './cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: SelectedProduct[];
  public totalPrice: number;

  constructor(private purchaseService: PurchaseService, private cartService: CartService) { 
    this.products = [];
    this.totalPrice = 0;
  }

  ngOnInit() {
    this.products = this.cartService.getAllSavedProducts();
    this.addProducts();

  }

  public goToTab(){
    this.purchaseService.triggerTabUpdate(true);
  }

  private addProducts(): void{
    let price = 0; 
    this.products.forEach((product)=>{
      price += product.price * product.quantity;
    });
    this.totalPrice = price;
  }
}
