import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot ,RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService {
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean |
  Observable<boolean> | Promise<boolean> {
    if(this.Token.isValid()==true){
      this.router.navigate(['/m']);
    }
    return !this.Token.isValid();
  }

  constructor(private Token:TokenService,private router: Router) { }
}
