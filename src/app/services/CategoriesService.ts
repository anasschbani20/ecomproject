import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({ providedIn: 'root' })
export class CategoriesService  {

  // v1/manager/categories/all
  // v1/manager/categories/get
  // v1/manager/categories/add
  // v1/manager/categories/delete
  // v1/manager/categories/update

  constructor(private apiService: ApiService) { }


  getCategories() {
    return this.apiService.get('v1/manager/categories/all');
  }
}
