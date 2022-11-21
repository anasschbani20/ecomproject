import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({ providedIn: 'root' })
export class ProductsService  {

  // v1/manager/products/all/page_size => POST
  // category_id => sometimes

  // v1/manager/products/get   => POST
  // 'id' => 'required|integer'

  // v1/manager/products/add  => POST
  // 'name' => 'required|string',
  // 'description' => 'sometimes|nullable|string',
  // 'ref' => 'sometimes|nullable|string',
  // 'price' => 'required|numeric',
  // 'availability' => 'required|boolean',
  // 'stock' => 'required|numeric',
  // 'tva' =>'sometimes|numeric'


  // v1/manager/products/delete  => POST
  // 'id' => 'required|integer'


  // v1/manager/products/update  => POST
  // 'id' => 'required|exists:orders,id',
  // 'name' => 'sometimes|string',
  // 'description' => 'sometimes|nullable|string',
  // 'ref' => 'sometimes|nullable|string',
  // 'price' => 'sometimes|numeric',
  // 'availability' => 'sometimes|boolean',
  // 'stock' => 'sometimes|numeric',
  // 'tva' =>'sometimes|numeric',
  // 'photo' => 'sometimes|file'

  constructor(private apiService: ApiService) { }


  getProducts(params: any) {
    return this.apiService.post('v1/manager/products/all', params);
  }

  getOneProduct(params: any) {
    return this.apiService.post('v1/manager/products/get', params);
  }

  addProduct(params: any) {
    return this.apiService.post('v1/manager/products/add', params);
  }

  updateProduct(params: any) {
    return this.apiService.post('v1/manager/products/update', params);
  }

  deleteProduct(params: any) {
    return this.apiService.post('v1/manager/products/delete', params);
  }


}
