import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "./product.service";
import { Product } from "src/interfaces/product";
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: "product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public existProduct: boolean;
  public product: Product;
  private subs: Subscription[];

  // //Reemplazar en un futuro
  // public name: string = 'mollit';
  // public quantity: number = 891;
  // public price: string = '$5,450';
  // public available: boolean = true;
  // public sublevel_id: number = 3;
  // public sublevel_name: string = 'Bebidas / Gaseosas / Sin azúcar';
  // public id: string = '58b5a5b117bf36cf8aed54ab';

  constructor(private productService: ProductService) {
    this.loading = true;
    this.existProduct = false;
    this.product = null;
    this.subs = [];
  }

  ngOnInit() {
    const defaultImageUrl = "url('../../../assets/default-image_600.png')";
    this.subs.push(this.productService
      .getProduct("58b5a5b117bf36cf8aed54ab")
      .subscribe((product: Product) => {
        if (product) {
          this.product = {
            ...product,
            price: product.price.replace(",", "."),
            photo_url: product.photo_url ? product.photo_url : defaultImageUrl
          };
          this.existProduct = true;
        }
        this.loading = false;
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      debugger;
      sub.unsubscribe()});
  }
}
