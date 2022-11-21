import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ToplayoutComponent} from "./toplayout/toplayout.component";
import {ProductsComponent} from "./products/products.component";
import {OneproductComponent} from "./oneproduct/oneproduct.component";

const routes: Routes = [
  {
    path: '',
    component: ToplayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainComponent
      },
      {
        path: 'products/:idCategory',
        component: ProductsComponent
      },
      {
        path: 'products/:idCategory/product/new',
        component: OneproductComponent
      },
      {
        path: 'products/:idCategory/product/:idProduct',
        component: OneproductComponent
      },
      {
        path: 'categories',
        redirectTo: ''
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
