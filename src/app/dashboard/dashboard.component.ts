import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../_services/admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.localAdmin = JSON.parse(localStorage.adminDetails);
    this.dashBoard();
  }

  public dashboard_counters: any = {};
  public InquiryList: any = [];
  public isLoading: boolean = false;
  dashBoard() {
    this.isLoading = true;
    this.AdminService.getDashBorad({}).subscribe((response: any) => {
      if (response.success == 1) {
        console.log(response);
        this.dashboard_counters = response.records;
        this.InquiryList = response.records.total_recent_inquiries;
      }
    })
  }

  public editlist = false;
  public popupInquiryList: any = [];
  editPopup(data) {
    if (this.editlist) {
      this.editlist = false;
      this.popupInquiryList = [];
    } else {
      this.editlist = true;

      console.log("Data received:", data);

      if (data && data.records) {
        if (data.records.total_recent_inquiries) {
          this.popupInquiryList = data.records.total_recent_inquiries;
        } else {
          console.warn('total_recent_inquiries is undefined');
          this.popupInquiryList = [];
        }
      } else {
        console.error('Data or records is undefined');
        this.popupInquiryList = [];
      }

      console.log("Popup list", this.popupInquiryList);
    }
  }
  closeEditlist() {
    this.editlist = false;
  }






  public localAdmin: any = {};

  isRemarkPopup: boolean = false;
  public statusObj:any = {};

  openRemarkPopup(id,status) {
    this.statusObj.id = id;
    if(status == 'Open'){
      this.statusObj.status = 'Closed';
      this.isRemarkPopup = true;

    }else{
      this.statusObj.status = 'Open';
      this.AdminService.changeInquiryStatus(this.statusObj).subscribe((response: any) => {
        if (response.success == 1) {
          this.dashBoard();
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
        this.statusObj = {};
        this.isRemarkPopup = false;
      });
    }

  }

}
