import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./UserService";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let res: any = null;
    try{
       res = await this.userService.populate();
    }catch (e) {
      console.log('error', e)
    }


    if(res){
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }


}
