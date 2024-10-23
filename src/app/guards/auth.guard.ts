import { AdminService } from './../_services/admin.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private AdminService : AdminService, 
    private router : Router
  ){

  }

  // public localAdmin:any  = {};
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // this.localAdmin = JSON.parse(localStorage.adminDetails); 
    if(!this.AdminService.isLoggedIn()){
      this.router.navigate(['login'])
      return false;
    }
    else {

      return this.AdminService.isLoggedIn();

    }
  }
  
}
