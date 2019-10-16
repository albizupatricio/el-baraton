import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ProductService } from "./product.service";
import { Product } from "../../models/product";
import { Category } from "../../models/category";
import { Subscription } from "rxjs/internal/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";
import { CartService } from "../purchase/cart/cart.service";
import Swal from "sweetalert2";
import { GlobalConstants } from '../../app.constants';

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
  public addingProduct: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private cartService: CartService,
    private location: Location,
    public constants: GlobalConstants
  ) {
    this.loading = true;
    this.existProduct = true;
    this.product = null;
    this.subs = [];
    this.addingProduct = false;
  }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.loadProduct(params.get("id"));
      })
    );
  }

  private loadProduct(id: string): void {
    this.subs.push(
      this.productService.getProduct(id).subscribe((product: Product) => {
        if (product) {
          this.subs.push(
            this.categoryService
              .getCategoriesAndSublevels(product.sublevel_id)
              .subscribe((categories: Category[]) => {
                this.setProductValues(
                  product,
                  categories.map(cat => cat.name).join(" - ")
                );
              })
          );
        } else {
          this.existProduct = false;
        }
        this.loading = false;
      })
    );
  }

  private setProductValues(product: Product, categoryTitles: string): void {
    const productInCart = this.cartService.getSelectedProduct(product.id);
    const productQuantity = productInCart ? productInCart.quantity : 0;
    this.product = {
      ...product,
      quantity: product.quantity - productQuantity,
      name: product.name.charAt(0).toUpperCase() + product.name.slice(1),
      price: product.price,
      categoryTitles: categoryTitles ? categoryTitles : "No identificada",
      photo_url: product.photo_url
        ? `url('${product.photo_url}')`
        : `url('${this.constants.defaultImageUrl}')`
    };
  }

  public insertInCart(product: Product): void {
    this.addingProduct = true;
    if (this.cartService.getSelectedProductQuantity(product.id) < 10) {
      this.cartService.addProduct(product.id, product.name,
        parseFloat(product.price.substr(1).replace('.', '').replace(",", ".")), product.photo_url);
      Swal.fire(
        "Agregado",
        `${this.product.name.charAt(0).toUpperCase()}${this.product.name.slice(1)} fue agregado a tu carro de compras.`,
        "success"
      ).finally(() => {
        this.product.quantity -= 1;
        this.addingProduct = false;
      });
    } else {
      Swal.fire(
        "Error",
        `${this.product.name.charAt(0).toUpperCase()}${this.product.name.slice(1)} no puede ser agregado a tu carro, ya que supera la cantidad máxima de productos por compra.`,
        "error"
      ).finally(() => {
        this.addingProduct = false;
      });
    }

  }

  public goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
