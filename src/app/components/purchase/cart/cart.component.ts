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
    this.calculateTotalPrince();

  }

  public goToTab(): void{
    this.purchaseService.triggerTabUpdate(true);
  }

  private calculateTotalPrince(): void{
    let price = 0; 
    this.products.forEach((product)=>{
      price += product.price * product.quantity;
    });
    this.totalPrice = price;
  }

  public addProduct(product: SelectedProduct): void{
    this.cartService.increaseProductQuantity(product.id);
    product.quantity += 1;
    this.calculateTotalPrince();
  }

  public decreaseProduct(product: SelectedProduct): void{
    this.cartService.decreaseProductQuantity(product.id);
    product.quantity -= 1;
    this.calculateTotalPrince();
  }

  public deleteProduct(product: SelectedProduct, pos: number): void{
    this.cartService.removeProduct(product.id);
    this.products.splice(pos, 1);
    this.calculateTotalPrince();
    if(this.products.length == 0){
      this.purchaseService.triggerEmptyCart();
    }
  }
}
