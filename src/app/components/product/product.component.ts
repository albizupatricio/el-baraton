import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "./product.service";
import { Product } from "../../models/product";
import { Category } from '../../models/category';
import { Subscription } from "rxjs/internal/Subscription";
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

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
  private defaultImageUrl: string;

  // //Reemplazar en un futuro
  // public name: string = 'mollit';
  // public quantity: number = 891;
  // public price: string = '$5,450';
  // public available: boolean = true;
  // public sublevel_id: number = 3;
  // public sublevel_name: string = 'Bebidas / Gaseosas / Sin azúcar';
  // public id: string = '58b5a5b117bf36cf8aed54ab';

  constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService) {
    this.loading = true;
    this.existProduct = true;
    this.product = null;
    this.subs = [];
    this.defaultImageUrl = '../../../assets/default-image_600.png';
  }

  ngOnInit() { 
    this.subs.push(this.route.paramMap.subscribe(params => {
      this.loadProduct(params.get("id"));
    }));
  }

  private loadProduct(id: string){
    this.subs.push(
      this.productService
        .getProduct(id)
        .subscribe((product: Product) => {
          if (product) {
            this.subs.push(
              this.categoryService
                .getCategoriesAndSublevels(product.sublevel_id)
                .subscribe((categories: Category[]) => {
                  this.setProductValues(product, categories.map(cat => cat.name).join(' - '));
                })
            );
          }else{
            this.existProduct = false;
          }
          this.loading = false;
        })
    );
  }

  private setProductValues(product: Product, categoryTitles: string){
    this.product = {
      ...product,
      price: product.price.replace(",", "."),
      categoryTitles: categoryTitles ? categoryTitles : 'No identificada',
      photo_url: product.photo_url
        ? `url('${product.photo_url}')` 
        : `url('${this.defaultImageUrl}')`
    };
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
