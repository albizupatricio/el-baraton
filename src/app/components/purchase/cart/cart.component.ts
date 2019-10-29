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

  public productsFormCtrl: FormArray;

  constructor(private purchaseService: PurchaseService,
              private cartService: CartService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.productsFormCtrl = this.purchaseForm.get('products') as FormArray;
    this.purchaseForm.controls.totalPrice.setValue(0);
    this.purchaseForm.controls.products = this.fb.array([]);
    this.cartService.getAllSavedProducts().map((product: SelectedProduct) => {
      this.productsFormCtrl.push(
        this.fb.group({
          quantity: [product.quantity],
          price: [product.price],
          name: [product.name],
          id: [product.id],
          photoUrl: [product.photoUrl]
        })
      );
    });
    this.calculateTotalPrince();
  }

  public goToTab(): void {
    this.purchaseService.triggerTabUpdate(true);
  }

  private calculateTotalPrince(): void {
    let price = 0;
    this.productsFormCtrl.controls.forEach((product: FormGroup) => {
      price += product.controls.price.value * product.controls.quantity.value;
    });
    this.purchaseForm.controls.totalPrice.setValue(price);
  }

  public addProduct(product: FormGroup): void {
    this.cartService.increaseProductQuantity(product.controls.id.value);
    product.controls.quantity.setValue(product.controls.quantity.value + 1);
    this.calculateTotalPrince();
  }

  public decreaseProduct(product: FormGroup): void {
    this.cartService.decreaseProductQuantity(product.controls.id.value);
    product.controls.quantity.setValue(product.controls.quantity.value - 1);
    this.calculateTotalPrince();
  }

  public deleteProduct(product: FormGroup, pos: number): void {
    this.cartService.removeProduct(product.controls.id.value);
    this.productsFormCtrl.controls.splice(pos, 1);
    this.calculateTotalPrince();
    if (this.productsFormCtrl.controls.length === 0) {
      this.purchaseService.triggerEmptyCart();
    }
  }
}
