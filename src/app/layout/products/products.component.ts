import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/CategoriesService";
// import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OnecategoryComponent} from "../onecategory/onecategory.component";
import Swal from "sweetalert2";
import {ProductsService} from "../../services/ProductsService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  loadingData = false;
  products = [];
  idCategory = null;
  constructor(private productService: ProductsService, private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe((params: any) => {
      if(params.idCategory){
        this.idCategory = params.idCategory;
        this.getProducts();
      }
    });
  }

  ngOnInit(): void {
  }

  async getProducts(){
    try{
      this.loadingData = true;
      const params = {
        category_id: this.idCategory
      }
      const res: any = await this.productService.getProducts(params).toPromise();
      console.log('getCategories', res);
      this.products = res.result?.data;
    }catch (e){
      console.log('error', e);
    }finally {
      this.loadingData = false;
    }
  }

  addNewProduct(product = null) {

  }

  async deleteProduct(product: any) {
    try{
      this.loadingData = true;
      const res: any = await this.productService.deleteProduct({id: product.id}).toPromise();
      this.getProducts();
      Swal.fire({
        icon: 'success',
        title: 'Perfect...',
        text: 'Product deleted successfully!',
      });
    }catch (e){
      console.log('error', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }finally {
      this.loadingData = false;
    }
  }

  askDeleteProduct(product: any) {
    Swal.fire({
      title: 'Do you want to delete this product?',
      showCancelButton: true,
      confirmButtonText: 'Yes delete',
      cancelButtonText: `cancel`,
      icon: 'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        this.deleteProduct(product);
      }
    })
  }

  toNumber(availability: any) {
    return Number(availability);
  }

  uploadPhoto() {

  }

}
