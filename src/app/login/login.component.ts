import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from "../_services/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loginObj: any = {};
  public isAdminLogin: boolean = false;
  public isShowpassword: boolean = false;
  constructor(
    public router: Router,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // if (this.adminService.isLoggedIn()) {
    //   this.router.navigate([""]);
    // }
  }

  // Show Password Function
  showPassword(id) {
    let input = document.getElementById(id);
    if (input.getAttribute("type") == "password") {
      this.isShowpassword = true;
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
      this.isShowpassword = false;
    }
  }

  // Login Form Submit
  adminLogin(form) {
    if (this.isAdminLogin == false) {
      this.isAdminLogin = true;
      if (form.valid) {
        this.adminService
          .adminLogin(this.loginObj)
          .subscribe((response: any) => {
            if (response.success === 1) {
              this.isAdminLogin = false;
              this.adminService.setToken(JSON.stringify(response.user));
              this.toastr.success(response.message);
              console.log(response.user.token);
              this.router.navigate(["/"]);
            } else {
              this.isAdminLogin = false;
              this.toastr.error(response.message);
            }
          });
      } else {
        this.isAdminLogin = false;
      }
    }
  }
}
