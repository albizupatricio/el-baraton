import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";
import { Observable } from "rxjs/internal/Observable";
import { Product } from "src/interfaces/product";
import { GlobalConstants } from "src/app/app.constants";
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
      map(products =>{
        return products['products'].filter((product: Product) => {
            return product.id === id;
          })[0];
      },
      catchError(error => {
        console.log("Product cannot be accessed");
        return of(null);
      })
      )
    );
  }

  // public getCategoriesTitles(category_id: number): Observable<String> {
  //   const url = this.constants.apiUrlRoutes.categories;
  //   return this.appService.httpGet(url).pipe(
  //     map(categories =>{
  //       return categories['categories'].filter((product: Product) => {
  //           return product.id === id;
  //         })[0];
  //     },
  //     catchError(error => {
  //       console.log("Category cannot be accessed");
  //       return of(null);
  //     })
  //     )
  //   );
  // }
}
