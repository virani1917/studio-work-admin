import { Component, OnInit , HostListener } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { AdminService } from "../_services/admin.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @HostListener('window:keydown', ['$event']) handleKeydown(event:KeyboardEvent){
    if(event.key === 'Escape' || event.keyCode === 27 ){
      this.profileDropdownClose();
    }
  }
  constructor(private router: Router, public AdminService: AdminService,
    private activatedRoute: ActivatedRoute) { 
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.checkLogin();
    //   }
    // })
  }

  ngOnInit() {
    this.getLoggedInUser();
  }


  
  public localAdmin:any  = {};
  public isSideBarActive:boolean  = true;
  public isdropDownActive:boolean  = false;


  public loggedInUser: any = {};
  getLoggedInUser() {
    let user: any = this.AdminService.getLoggedInUser();
    this.loggedInUser = user.value;
  }


// Sidebar Function
sideBarClick(){
  if(this.isSideBarActive == true){
    this.isSideBarActive = false ;
  }else {
    this.isSideBarActive = true ;
  }
}

// Profile Dropdown Function
profileDropdown(){
    this.isdropDownActive = true ;
}
profileDropdownClose(){
    this.isdropDownActive = false ;
}


// Logout Function
  logout(){
    this.AdminService.logout();
  }


}
