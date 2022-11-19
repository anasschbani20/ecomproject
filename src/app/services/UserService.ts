import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";
import {JwtService} from "./Jwt.service";

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
  connectedUSer: any = null;
  constructor(private apiService: ApiService, private jwtService: JwtService) { }

  async populate() {
    try{
      this.connectedUSer = null;
      const res: any = await this.apiService.get('auth/getAuthenticatedUser').toPromise();
      if(res.result?.data){
        this.connectedUSer = res.result.data.user;
        this.jwtService.saveToken(res.result.data.token);
      }
    }catch (e) {
      console.log(e);
    }
    return this.connectedUSer;
  }

  async login(params: any) {
    try{
      this.connectedUSer = null;
      const res: any = await this.apiService.post('auth/signin', params).toPromise();
      console.log('login', res);
      if(res.result?.data){
        this.connectedUSer = res.result.data.user;
        this.jwtService.saveToken(res.result.data.token);
      }
    }catch (e) {
      console.log(e);
    }
    return this.connectedUSer;
  }


  getConnectedUser(){
    return this.connectedUSer;
  }


}
