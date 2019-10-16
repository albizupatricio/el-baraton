import { Injectable } from "@angular/core";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/internal/Observable";
import { Product } from "../../models/product";
import { GlobalConstants } from "../../app.constants";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(
    private appService: AppService,
    public constants: GlobalConstants
  ) {}

  public getProduct(id: string): Observable<Product> {
    const url = this.constants.apiUrlRoutes.products;
    return this.appService.httpGet(url).pipe(
      map(products => products['products'].filter((product: Product) => product.id === id)[0]),
      catchError(error => {
        console.error("Product cannot be accessed");
        return of(null);
      })
    );
  }

  public getProductByCategory(categoryId: number): Observable<Product[]> {
    const url = this.constants.apiUrlRoutes.products;
    return this.appService.httpGet(url).pipe(
      map(products => products['products'].filter((product: Product) => product.sublevel_id === categoryId)),
      catchError(error => {
        console.error("Product cannot be accessed");
        return of(null);
      })
    );
  }
}
