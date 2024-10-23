
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../_services/admin.service";
import { PagerService } from "../_services/pager-service";
import { ExcelService } from "../_services/excel.service";


@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.css']
})
export class InquiryListComponent implements OnInit {
  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,
    private excelService:ExcelService

  ) {}

  ngOnInit() {
    this.loadInquiries();
  }

  public InquiryList: any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    status:""
  };

  // Search Filter Function

  searchList(search) {
    this.dataObj.page = 1;
    this.dataObj.search = search;
    this.loadInquiries();
  }

  // Pagination Function

  changePage(page) {
    this.dataObj.page = page;
    this.loadInquiries();
  }

  // Projects Listing  API

  loadInquiries() {
    this.AdminService.loadInquiry(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.InquiryList = response.inquiries;
        this.dataObj.total = response.total_inquiry;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.InquiryList = [];
        this.dataObj.total = 0;
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
      this.loadInquiries();
    }
  }
  // Project Change Status  API

  // changeStatus(id,status) {

  //   if(status == 'Open'){
  //     status = 'Closed';
  //   }else{
  //     status = 'Open';
  //   }
  //   this.AdminService.changeInquiryStatus({ id: id , status: status}).subscribe((response: any) => {
  //     if (response.success == 1) {
  //       this.loadInquiries();
  //       this.toastr.success(response.message);
  //     } else {
  //       this.toastr.error(response.message);
  //     }
  //   });
  // }


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
          this.loadInquiries();
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
    this.AdminService.changeInquiryStatus(this.statusObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.loadInquiries();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      this.statusObj = {};
      this.isRemarkPopup = false;
    });
  }

  filter(){
    this.loadInquiries();
  }
  
  
  public editlist = false;
public producInquiryList: any = [];

  editPopup(data) {
    if (this.editlist) {
      this.editlist = false;
      this.producInquiryList = [];
    } else {
      this.editlist = true;
      this.producInquiryList = data.product_inquiries;
    }
  }
  closeEditlist() {
    this.editlist = false;
  }




  public exportFlag: boolean = false;

  exportAsXLSX(): void {
    let exportObj: any = {
      page: 0,
      limit: 100000,
    };
    this.exportFlag = true;
    this.AdminService.loadInquiry(exportObj).subscribe((response: any) => {
      var responseData = JSON.parse(JSON.stringify(response));

      if (responseData.success) {
        var exportData = responseData.inquiries.map(function (a, index) {

          return {
            'SR.NO': index + 1,
            'Name': a.name,
            'Type':a.type,
            'Contact Details':a.contact_no,
            'Email':a.email,
            'Address':a.address,
            'Comments': a.message,
            
          };
        });

        this.excelService.exportAsExcelFile(
          exportData,
          "Inquiry List"
        );
        this.exportFlag = false;
      }
    });
  }




}
