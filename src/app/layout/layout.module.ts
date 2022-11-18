import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ShopsComponent } from './shops/shops.component';
import { ProductsComponent } from './products/products.component';
import { OneproductComponent } from './oneproduct/oneproduct.component';
import { OnecategoryComponent } from './onecategory/onecategory.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { CoverComponent } from './cover/cover.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    ShopsComponent,
    ProductsComponent,
    OneproductComponent,
    OnecategoryComponent,
    MainComponent,
    HeaderComponent,
    CoverComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
