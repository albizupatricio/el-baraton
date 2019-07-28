import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private updateTabCounter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public getTabUpdate(): EventEmitter<boolean>{
    return this.updateTabCounter;
  }

  public triggerTabUpdate(next: boolean): void{
    this.updateTabCounter.emit(next);
  }
}
