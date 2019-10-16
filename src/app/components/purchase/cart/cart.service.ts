import { Injectable, EventEmitter } from "@angular/core";
import { SelectedProduct } from '../../../models/selectedProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor() {}

  private updateCartCounter: EventEmitter<boolean> = new EventEmitter();

  public getAllSavedProducts(): SelectedProduct[] {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    return products;
  }

  public getSavedProductsQuantity(): number {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    let productsQuantity = 0;
    products.map((product)=>{
      productsQuantity += product.quantity;
    })
    return productsQuantity;
  }

  public getSelectedProduct(id: string): SelectedProduct {
    let productsArray: SelectedProduct[] = JSON.parse(
      localStorage.getItem("products")
    );
    if(productsArray === null){
      productsArray = [];
    }
    const product = productsArray.filter(product => product.id === id)[0];
    if (product) {
      return product;
    }
    return null;
  }

  public getSelectedProductQuantity(id: string): number {
    let productsArray: SelectedProduct[] = JSON.parse(
      localStorage.getItem("products")
    );
    if(productsArray === null){
      productsArray = [];
    }
    const product = productsArray.filter(product => product.id === id)[0];
    if (product) {
      return product.quantity;
    }
    return 0;
  }

  public purchaseCompleted(): void {
    localStorage.clear();
  }

  public addProduct(id: string, name: string, price: number, photo: string): void {
    let productsArray: SelectedProduct[] = JSON.parse(
      localStorage.getItem("products")
    );
    let newProduct = true;
    if(productsArray){
      productsArray = productsArray.map((product) => { 
        if(product.id === id){
          newProduct = false;
          product.quantity += 1;
        }
        return product;
      });
    }else{
      productsArray = [];
    }
    if(newProduct){
      const product: SelectedProduct = {
        id: id,
        name: name,
        price: price,
        quantity: 1,
        photoUrl: photo
      }
      productsArray.push(product);
    }
    localStorage.setItem('products', JSON.stringify(productsArray));
    this.triggerCounterUpdate(true);
  }

  public removeProduct(id: string): void {
    let productsArray: SelectedProduct[] = JSON.parse(
      localStorage.getItem("products")
    );
    if(productsArray){
      productsArray = productsArray.filter((product) => { 
        if(product.id !== id){
          return product;
        }
      });
      if(productsArray){
        localStorage.setItem('products', JSON.stringify(productsArray));
      }
    }
  }

  public getCounterUpdate(): EventEmitter<boolean>{
    return this.updateCartCounter;
  }

  private triggerCounterUpdate(adding: boolean): void{
    this.updateCartCounter.emit(adding);
  }

  public increaseProductQuantity(id: string): void{
    let productsArray: SelectedProduct[] = JSON.parse(
      localStorage.getItem("products")
    );
    productsArray = productsArray.map((product) => { 
      if(product.id === id){
        product.quantity += 1;
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(productsArray));
    this.triggerCounterUpdate(true);
  }

  public decreaseProductQuantity(id: string): void{
    let productsArray: SelectedProduct[] = JSON.parse(
      localStorage.getItem("products")
    );
    productsArray = productsArray.map((product) => { 
      if(product.id === id){
        product.quantity -= 1;
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(productsArray));
    this.triggerCounterUpdate(false);
  }
}
