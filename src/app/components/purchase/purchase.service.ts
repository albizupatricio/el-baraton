import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private updateTabCounter: EventEmitter<boolean> = new EventEmitter();
  private emptyCart: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public getTabUpdate(): EventEmitter<boolean>{
    return this.updateTabCounter;
  }

  public triggerTabUpdate(next: boolean): void{
    this.updateTabCounter.emit(next);
  }

  public getEmptyCart(): EventEmitter<void>{
    return this.emptyCart;
  }

  public triggerEmptyCart(): void{
    this.emptyCart.emit();
  }
}
