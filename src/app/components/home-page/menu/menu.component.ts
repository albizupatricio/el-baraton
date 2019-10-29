import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Category } from 'src/app/models/category';
import { BreadCrumbs } from 'src/app/models/breadCrumbs';
import { ProductService } from '../../product/product.service';
import { Product } from 'src/app/models/product';
import { GlobalConstants } from '../../../app.constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  public hasCategories: boolean = true;
  public filteredCategories: Category[] = [];
  public filteredProducts: Product[] = [];
  public loading: boolean;
  public breadcrumbsNames: BreadCrumbs[] = [];
  public searchNavExpanded: boolean = false;
  private allCategories = [];
  private subs: Subscription[] = [];
  public searchCtrl: FormControl = new FormControl('');

  constructor(private categoryService: CategoryService, private productService: ProductService,
    public constants: GlobalConstants) { }

  ngOnInit() {
    this.loading = true;
    this.breadcrumbsNames.push({
      categoryId: 0,
      name: 'Categorías'
    });
    this.subs.push(
      this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
        this.allCategories = categories;
        this.allCategories.forEach((category: Category) => {
          this.filteredCategories.push(category);
        });
        this.loading = false;
      }),
      this.searchCtrl.valueChanges.subscribe((value) => {
        if (value.length > 1) {
          this.subs.push(this.productService.getProductByPartialName(value).subscribe((products) => {
            products.forEach((productsElement) => {
              productsElement.photo_url = productsElement.photo_url
                ? `url('${productsElement.photo_url}')`
                : `url('${this.constants.defaultImageUrl}')`;
            });
            this.filteredProducts = products;
          }));
        } else {
          this.filteredProducts = [];
        }
      })
    );
  }

  public filterCategories(category: Category) {
    this.loading = true;
    this.filteredCategories = [];
    this.breadcrumbsNames.unshift({
      categoryId: category.id,
      name: category.name
    });
    if (category.sublevels && category.sublevels.length > 0) {
      category.sublevels.forEach((sublevel: Category) => {
        this.filteredCategories.push(sublevel);
      });
    }
    this.getProductByCategory(category.id);
    this.loading = false;
  }

  public jumpToCategory(categoryId: number) {
    if (categoryId === this.breadcrumbsNames[0].categoryId) {
      return;
    }
    this.loading = true;
    if (categoryId === 0) {
      this.filteredCategories = [];
      this.allCategories.forEach((category: Category) => {
        this.filteredCategories.push(category);
      });
      this.breadcrumbsNames = [{
        categoryId: 0,
        name: 'Categorías'
      }];
      this.filteredProducts = [];
    } else {
      this.filteredCategories = this.allCategories;
      for (let i = this.breadcrumbsNames.length - 2; i >= 0; i--) {
        const category = this.filteredCategories.find(categoryElement => categoryElement.id === this.breadcrumbsNames[i].categoryId);
        this.filteredCategories = category.sublevels;
        if (this.breadcrumbsNames[i].categoryId === categoryId) {
          this.breadcrumbsNames = this.breadcrumbsNames.slice(i, this.breadcrumbsNames.length);
          break;
        }
      }
      this.getProductByCategory(categoryId);
    }
    this.loading = false;
  }

  private getProductByCategory(categoryId): void {
    this.filteredProducts = [];
    this.subs.push(
      this.productService.getProductByCategory(categoryId).subscribe((products: Product[]) => {
        products.forEach((productsElement) => {
          productsElement.photo_url = productsElement.photo_url
            ? `url('${productsElement.photo_url}')`
            : `url('${this.constants.defaultImageUrl}')`;
        })
        this.filteredProducts = products;
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
