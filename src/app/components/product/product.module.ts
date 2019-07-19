import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product.component';
import { productRoutes } from './product.routes';

@NgModule(
    {
        declarations: [
            ProductComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            SharedModule,
            RouterModule.forChild(productRoutes)
        ]
    }
)

export class ProductModule {

}
