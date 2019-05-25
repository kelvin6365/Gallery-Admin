import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getAtoken(){
    return localStorage.getItem("access_token");
  };

  getRtoken(){
    return localStorage.getItem("refresh_token");
  };

  set(Atoken,Rtoken) {
    localStorage.setItem("access_token",Atoken);
    localStorage.setItem("refresh_token",Rtoken);
  }

  isValid() {
    const token = this.getAtoken();
    if(token){
      return true;
    }
    else{
      return false;
    }
  }
}
