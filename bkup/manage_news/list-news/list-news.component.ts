import { PagerService } from './../../_services/pager-service';
import { AdminService } from "./../../_services/admin.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,

  ) {}

  ngOnInit() {
    this.loadNews();
  }

  public newsList: any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    category : '',
  };
  public totalTeams: number = 0;
  public deleteObj: any = {};
  public isDeletePopup: boolean = false;


  // Search Filter Function

  searchList(search) {
    this.dataObj.page = 1;
    this.dataObj.search = search;
    this.loadNews();
  }

  // Pagination Function

  changePage(page) {
    this.dataObj.page = page;
    this.loadNews();
  }

  // Projects Listing  API

  loadNews() {
    this.AdminService.loadnews(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.newsList = response.news;
        this.dataObj.total = response.total_news;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.newsList = [];
        console.log(this.newsList, "empttyyyyyyyyy");
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
      this.loadNews();
    }
  }
  // Project Change Status  API

  changeStatus(id) {
    this.AdminService.changeStatusNews({ id: id }).subscribe((response: any) => {
      if (response.success == 1) {
        this.loadNews();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  // Project Delete Popup Function

  deleteNews(team) {
    if (this.isDeletePopup == false) {
      this.isDeletePopup = true;
      this.deleteObj = team;
    } else {
      this.isDeletePopup = false;
      this.deleteObj = {};
    }
  }
  deleteTeamClose() {
    this.isDeletePopup = false;
    this.deleteObj = {};
  }

  // Confirm Project Delete API Function

  confirmDelete(id) {
    if (this.isDeletePopup == true) {
      this.AdminService.deleteNews({ id: id }).subscribe((response: any) => {
        if (response.success == 1) {
          this.isDeletePopup = false;
          this.toastr.success(response.message);
          this.loadNews();
        }
      });
    }
  }

}
