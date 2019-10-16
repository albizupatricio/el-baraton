import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule(
    {
        declarations: [
            MenuComponent,
            HomePageComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            SharedModule,
            RouterModule
        ]
    }
)

export class HomePageModule {

}
