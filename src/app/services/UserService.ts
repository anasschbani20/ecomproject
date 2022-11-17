import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({ providedIn: 'root' })
export class UserService  {

  // /auth/signin
  // /auth/getAuthenticatedUser
  // /auth/signup

  // v1/manager/users/all
  // v1/manager/users/get
  // v1/manager/users/add
  // v1/manager/users/delete
  // v1/manager/users/update
  connectedUSer = null;
  constructor(private apiService: ApiService) { }

  async populate() {
    try{
      this.connectedUSer = null;
      const res: any = await this.apiService.get('auth/getAuthenticatedUser').toPromise();
      this.connectedUSer = res.result.data;
      console.log('populate', res, this.connectedUSer);
      return this.connectedUSer;
    }catch (e) {
      console.log(e);
    }finally {

    }
    return null;
  }

  async login(params: any) {
    try{
      this.connectedUSer = null;
      const res: any = this.apiService.post('auth/signin', params).toPromise();
      this.connectedUSer = res.result.data;
    }catch (e) {
      console.log(e);
    }finally {

    }
  }




}
