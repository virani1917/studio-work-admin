import { PagerService } from './../../_services/pager-service';
import { AdminService } from "./../../_services/admin.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,

  ) {}

  ngOnInit() {
    this.loadTeams();
  }

  public teamList: any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    // category : '',
  };
  public totalTeams: number = 0;
  public deleteObj: any = {};
  public isDeletePopup: boolean = false;



  searchList(search) {
    this.dataObj.page = 1;
    this.dataObj.search = search;
    this.loadTeams();
  }

  searchCategory(category) {
    this.dataObj.page = 1;
    this.dataObj.category = category;
    this.loadTeams();
  }

  changePage(page) {
    this.dataObj.page = page;
    this.loadTeams();
  }


  loadTeams() {
    this.AdminService.loadteam(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.teamList = response.teams;
        this.dataObj.total = response.total_team;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.teamList = [];
        console.log(this.teamList, "empttyyyyyyyyy");
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
  

  changeStatus(id) {
    this.AdminService.changeStatusTeam({ id: id }).subscribe((response: any) => {
      if (response.success == 1) {
        this.loadTeams();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }



  deleteTeam(team) {
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

 

  confirmDelete(id) {
    if (this.isDeletePopup == true) {
      this.AdminService.deleteTeam({ id: id }).subscribe((response: any) => {
        if (response.success == 1) {
          this.isDeletePopup = false;
          this.toastr.success(response.message);
          this.loadTeams();
        }
      });
    }
  }

}
