import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot):boolean{

    if(sessionStorage.getItem('admin')){
      return true;
    }else if(sessionStorage.getItem('user')){
      return true;
    }
    else{
      this.router.navigate(['login'])
    }
  }
  
}
