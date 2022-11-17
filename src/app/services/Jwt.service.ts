import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {

  private token: any = null;

  private tokenName = 'jwt_token'

  getToken() {
    // If token has been removed by another app
    if( localStorage.getItem( this.tokenName ) == null ){
      this.saveToken(this.token)
      return this.token
    }
    else
      return localStorage.getItem( this.tokenName );
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem( this.tokenName , token);
  }

  destroyToken() {
    this.token = null;
    localStorage.removeItem( this.tokenName );
  }
}
