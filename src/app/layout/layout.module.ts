import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ShopsComponent } from './shops/shops.component';
import { ProductsComponent } from './products/products.component';
import { OneproductComponent } from './oneproduct/oneproduct.component';
import { OnecategoryComponent } from './onecategory/onecategory.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    ShopsComponent,
    ProductsComponent,
    OneproductComponent,
    OnecategoryComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
