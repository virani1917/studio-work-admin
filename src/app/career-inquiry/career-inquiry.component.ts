import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../_services/admin.service";
import { PagerService } from "../_services/pager-service";

@Component({
  selector: 'app-career-inquiry',
  templateUrl: './career-inquiry.component.html',
  styleUrls: ['./career-inquiry.component.css']
})
export class CareerInquiryComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,

  ) {}

  ngOnInit() {
    this.loadTeams();
  }

  public InquiryList: any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    category : '',
  };

  // Search Filter Function

  searchList(search) {
    this.dataObj.page = 1;
    this.dataObj.search = search;
    this.loadTeams();
  }

  // Pagination Function

  changePage(page) {
    this.dataObj.page = page;
    this.loadTeams();
  }

  // Projects Listing  API

  loadTeams() {
    this.AdminService.loadcareerInquiry(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.InquiryList = response.joining_requests;
        this.dataObj.total = response.total_joining_request;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.InquiryList = [];
        console.log(this.InquiryList, "empttyyyyyyyyy");
      }
    });
  }

  public usersPager: any = [];
  setUsersPage(page: number, flag: number) {
    this.usersPager = this.pagerService.getPager(
      this.dataObj.total,
      page,
      this.dataObj.limit
    );
    this.dataObj.page = this.usersPager.currentPage;
    if (flag == 1) {
      this.loadTeams();
    }
  }
  // Project Change Status  API

  isRemarkPopup: boolean = false;
  public statusObj:any = {};

  openRemarkPopup(id,status) {
    this.statusObj.id = id;
    if(status == 'Open'){
      this.statusObj.status = 'Closed';
      this.isRemarkPopup = true;

    }else{
      this.statusObj.status = 'Open';
      this.AdminService.changecareerInquiryStatus(this.statusObj).subscribe((response: any) => {
        if (response.success == 1) {
          this.loadTeams();
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
        this.statusObj = {};
        this.isRemarkPopup = false;
      });
    }

  }

  closeRemarkPopup() {
    this.isRemarkPopup = false;
    this.statusObj = {};
  }

  changeStatus() {
    this.AdminService.changecareerInquiryStatus(this.statusObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.loadTeams();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      this.statusObj = {};
      this.isRemarkPopup = false;
    });
  }



}
