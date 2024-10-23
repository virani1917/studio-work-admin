import { Component, OnInit } from "@angular/core";
import { ChildActivationEnd } from "@angular/router";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from "../../_services/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    public router: Router,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    let user: any = this.adminService.getLoggedInUser();
    this.changePasswordObj.id = user.value.id;
  }

  public isShowpassword: boolean = false;
  public isShowpasswordKey: any = "";
  public changePasswordObj: any = {};

  public isAdminLogin: boolean = false;

  // Show Password Function
  showPassword(id) {
    let input = document.getElementById(id);
    if (input.getAttribute("type") == "password") {
      input.nextElementSibling.classList.add("active");

      // this.isShowpassword = true;
      // this.isShowpasswordKey = id;
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
      input.nextElementSibling.classList.remove("active");
      // this.isShowpasswordKey = '';
      // this.isShowpassword = false;
      // this.isShowpassword = '';
    }
  }
  changePassword(form) {
    if (
      this.changePasswordObj.confirm_password ===
      this.changePasswordObj.new_password
    ) {
      if (this.isAdminLogin == false) {
        this.isAdminLogin = true;
        if (form.valid) {
          this.adminService
            .changePassword(this.changePasswordObj)
            .subscribe((response: any) => {
              if (response.success === 1) {
                this.changePasswordObj = {};
                this.isAdminLogin = false;
                this.toastr.success(response.message);
                this.router.navigate([""]);
              } else {
                this.changePasswordObj = {};
                this.isAdminLogin = false;
                this.toastr.error(response.message);
              }
            });
        } else {
          this.isAdminLogin = false;
        }
      }
    } else {
      this.toastr.error(
        "New password and confirmed password does not matched !!!!"
      );
    }
  }
}
