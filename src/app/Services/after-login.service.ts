import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot ,RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate{
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean |
  Observable<boolean> | Promise<boolean> {
    if(this.Token.isValid()==false){
      this.router.navigate(['/login']);
    }
    
    return this.Token.isValid();
  }

  constructor(private Token:TokenService,private router: Router) { }
}
