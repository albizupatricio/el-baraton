import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomePageComponent } from "./components/home-page/home-page.component";

export const routes: Routes = [
  { path: "homepage", component: HomePageComponent },
  {
    path: "product/:id",
    loadChildren: () =>
      import("./components/product/product.module").then(m => m.ProductModule)
  },
  {
    path: "purchase",
    loadChildren: () =>
      import("./components/purchase/purchase.module").then(
        m => m.PurchaseModule
      )
  },
  { path: "", pathMatch: "full", redirectTo: "/homepage" },
  { path: "**", pathMatch: "full", redirectTo: "/homepage" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
