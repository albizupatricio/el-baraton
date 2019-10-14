import { Component, OnInit, Input } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { SelectedProduct } from 'src/app/models/selectedProduct';
import { CartService } from './cart.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() purchaseForm: FormGroup;
  
  public totalPriceCtrl: FormControl;
  public productsCtrl: FormArray;

  constructor(private purchaseService: PurchaseService, 
              private cartService: CartService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.totalPriceCtrl = this.purchaseForm.get('totalPrice') as FormControl;
    this.totalPriceCtrl.setValue(0);
    this.productsCtrl = this.purchaseForm.get('products') as FormArray;
    this.productsCtrl = this.fb.array([]);
    this.cartService.getAllSavedProducts().map((product : SelectedProduct)=>{
      this.productsCtrl.push(
        this.fb.group({
          quantity: [product.quantity],
          price: [product.price],
          name: [product.name],
          id: [product.id],
          photoUrl: [product.photoUrl]
        })
      );
    })
    this.calculateTotalPrince();
  }

  public goToTab(): void{
    this.purchaseService.triggerTabUpdate(true);
  }

  private calculateTotalPrince(): void{
    let price = 0; 
    this.productsCtrl.controls.forEach((product: FormGroup)=>{
      price += product.get('price').value * product.get('quantity').value;
    });
    this.totalPriceCtrl.setValue(price);
  }

  public addProduct(product: FormGroup): void{
    this.cartService.increaseProductQuantity(product.get('id').value);  
    product.controls.quantity.setValue(product.controls.quantity.value + 1);
    this.calculateTotalPrince();
  }

  public decreaseProduct(product: FormGroup): void{
    this.cartService.decreaseProductQuantity(product.get('id').value);  
    product.controls.quantity.setValue(product.controls.quantity.value - 1);
    this.calculateTotalPrince();
  }

  public deleteProduct(product: FormGroup, pos: number): void{
    this.cartService.removeProduct(product.get('id').value);
    this.productsCtrl.controls.splice(pos, 1);
    this.calculateTotalPrince();
    if(this.productsCtrl.controls.length == 0){
      this.purchaseService.triggerEmptyCart();
    }
  }
}
