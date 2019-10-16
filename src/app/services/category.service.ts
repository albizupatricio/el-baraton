import { Injectable } from "@angular/core";
import { AppService } from '../app.service';
import { GlobalConstants } from '../app.constants';
import { Category } from '../models/category';
import { catchError, map } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(
    private appService: AppService,
    public constants: GlobalConstants
  ) {}

  public getAllCategories(): Observable<Category[]> {
    const url = this.constants.apiUrlRoutes.categories;
    return this.appService.httpGet(url).pipe(
      map(categories => {
        return categories.categories;
      }),
      catchError(error => {
        console.error("Category cannot be accessed");
        return of([]);
      })
    );
  }


  public getCategoriesAndSublevels(id: number): Observable<Category[]> {
    const url = this.constants.apiUrlRoutes.categories;
    return this.appService.httpGet(url).pipe(
      map(categories => {
        const flattedCategories = [];
        this.flatCategories(categories["categories"], id, flattedCategories);
        return flattedCategories;
      }),
      catchError(error => {
        console.error("Category cannot be accessed");
        return of([]);
      })
    );
  }

  private flatCategories(
    categories: Category[],
    id: number,
    flattedCategories: Category[]
  ): void {
    let flattedBranch = false;
    for (let i = categories.length - 1; i >= 0 && !flattedBranch; i--) {
      if (categories[i].id <= id) {
        flattedBranch = true;
        const category = {
          id: categories[i].id,
          name: categories[i].name
        };
        flattedCategories.push(category);
        if (categories[i].id < id) {
          this.flatCategories(categories[i].sublevels, id, flattedCategories);
        }
      }
    }
  }
}
