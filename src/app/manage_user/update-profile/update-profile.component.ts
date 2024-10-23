import { AdminService } from "./../../_services/admin.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getUserProfile();
    
    
  }

  getUserProfile(){
    this.localAdmin = JSON.parse(localStorage.adminDetails);
    this.profileObj.id = this.localAdmin.id;
    this.profileObj.name = this.localAdmin.name;
    this.profileObj.email = this.localAdmin.email;
    this.profileObj.contact_no = this.localAdmin.contact_no;
    this.profileObj.image = this.localAdmin.image;

  }

  public  localAdmin:any = {};

  public profileObj: any = {
    id: '',
    name: '',
    email : '',
    contact_no : '',
  };

  public coverIcon: any = null;
  public isteamSave: boolean = false;


   // Keypress Function for Numbers Only
   _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  //  //  Function for Fetching Project Id
  //  fectchTeamId() {
  //   this.route.params.subscribe((params) => {
  //     if (params["slug"]) {
  //       let slug = params["slug"];
  //       this.getTeamdetails(slug);
  //     }
  //   });
  // }

  // Project Detail Function for Fectching Detail While Edit
  // getUseretails() {
  //   this.AdminService.teamDetail({id : }).subscribe((response: any) => {
  //     if (response.success == 1) {
  //       this.profileObj = response.team;
  //     }else {
  //       this.router.navigate([""]);        
  //     }
  //   });
  // }

  //  Cover Icon Preiew Function
  onCoverIconChange(event) {
    var file = event.srcElement.files[0];
    if (typeof file.type != "undefined") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverIcon = e.target.result;
      };
      this.profileObj.image = file;
      reader.readAsDataURL(file);
    }
  }

  removeImage(){
    this.profileObj.image = "";
    this.profileObj.remove_image = "delete";
  }

  updateUserProfile(form) {
    let formdata = new FormData();
    formdata.append("from_app", "true");


    for (let key in this.profileObj) {
      if (
        this.profileObj[key] !== undefined &&
        this.profileObj[key] !== null
      ) {
        formdata.append(key, this.profileObj[key]);
      }
    }

    if (this.isteamSave == false) {
      this.isteamSave = true;
      if (form.valid) {
        this.AdminService.updateProfile(formdata).subscribe((response: any) => {
          if (response.success === 1) {
            this.profileObj = {};
            this.isteamSave = false;
            this.router.navigate([""]);
            this.toastr.success(response.message);
          } else {
            this.isteamSave = false;
            this.toastr.error(response.message);
          }
        });
      } else {
        this.isteamSave = false;
      }
    }
  }
}