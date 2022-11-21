import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({ providedIn: 'root' })
export class CategoriesService  {

  // v1/manager/categories/all


  // v1/manager/categories/get => POST
  // 'id' => 'required|integer'

  // v1/manager/categories/add => POST
  // 'name' => 'required|nullable|string'
  // 'photo' => 'sometimes|nullable',
  // 'slug' => 'sometimes|nullable|string'

  // v1/manager/categories/delete POST
  // 'id' => 'required|integer'


  // v1/manager/categories/update
  // 'id' => 'required|exists:categories,id',
  // 'photo' => 'sometimes|nullable',
  // 'name' => 'sometimes|nullable|string'
  // 'slug' => 'sometimes|nullable|string'

  constructor(private apiService: ApiService) { }


  getCategories() {
    return this.apiService.get('v1/manager/categories/all');
  }

  addCategory(params: any) {
    return this.apiService.post('v1/manager/categories/add', params);
  }

  updateCategory(params: any) {
    return this.apiService.post('v1/manager/categories/update', params);
  }

  deleteCategory(params: any) {
    return this.apiService.post('v1/manager/categories/delete', params);
  }

}
