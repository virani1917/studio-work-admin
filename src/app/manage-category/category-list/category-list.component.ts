import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';
import { PagerService } from 'src/app/_services/pager-service';
import { ExcelService } from "src/app/_services/excel.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.loadCategory();
  }



  public categoryList: any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    parent_id: "",
  };

  public totalProjects: number = 0;
  public deleteObj: any = {};
  public isDeletePopup: boolean = false;

  //Sorting Functions

  public sortByActive: any = false;

  sortByName() {
    if (this.sortByActive == false) {
      this.categoryList.sort((a, b) => a.name.localeCompare(b.name));
      console.log(this.categoryList)
      this.sortByActive = true
    }
    else {
      this.categoryList.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByActive = false;
      console.log(this.categoryList)
    }
  }

  // Search Filter Function

  searchList(search) {
    this.dataObj.page = 1;
    this.dataObj.search = search;
    this.loadCategory();
  }

  // searchCategory(category) {
  //   this.dataObj.page = 1;
  //   this.dataObj.category = category;
  //   this.loadCategory();
  // }

  applyFilters() {
    this.loadCategory();
  }

  // Pagination Function

  changePage(page) {
    this.dataObj.page = page;
    this.loadCategory();
  }



  public parentCategoryList: any = [];

  loadCategory() {
    this.AdminService.loadCategory(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.categoryList = response.categories;

        this.categoryList.forEach(element => {
          if (element.child_categories.length > 0) {
            const isPresent = this.parentCategoryList.some(category => category.id === element.id);
            if (!isPresent) {
              this.parentCategoryList.push(element);
            }
          }
        });

        // this.categoryList.forEach((project) => {
        //   if (
        //     project.category &&
        //     this.categoryList.indexOf(project.category) === -1
        //   ) {
        //     this.categoryList.push(project.category);
        //   }
        // });

        this.dataObj.total = response.total_category;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.categoryList = [];
        this.dataObj.total = 0;
        console.log(this.categoryList, "empttyyyyyyyyy");
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
      this.loadCategory();
    }
  }
  // Project Change Status  API

  changeStatus(id) {
    this.AdminService.changeStatus({ id: id }).subscribe((response: any) => {
      if (response.success == 1) {
        this.loadCategory();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  // Project Delete Popup Function

  deleteCategories(category) {
    if (!this.isDeletePopup) {
      this.isDeletePopup = true;
      this.deleteObj = category;
    } else {
      this.isDeletePopup = false;
      this.deleteObj = {};
    }
  }

  deleteProjectClose() {
    this.isDeletePopup = false;
    this.deleteObj = {};
  }

  // Confirm Project Delete API Function

  confirmDelete(id) {
    if (this.isDeletePopup == true) {
      this.AdminService.deleteCategory({ id: this.deleteObj.id }).subscribe((response: any) => {
        if (response.success == 1) {
          this.isDeletePopup = false;
          this.toastr.success(response.message);
          this.loadCategory();
        }
      });
    }
  }


  /* Code for exorting the category starts from here */

  public exportFlag: boolean = false;

  exportAsXLSX(): void {
    let exportObj: any = {
      page: 0,
      limit: 100000,
    };
    this.exportFlag = true;
    this.AdminService.loadCategory(exportObj).subscribe((response: any) => {
      var responseData = JSON.parse(JSON.stringify(response));

      if (responseData.success) {
        var exportData = responseData.categories.map(function (a, index) {

          return {
            'SR.NO': index + 1,
            'Name': a.category,
            'Inquiry Count': a.inquiry_count,
            'Page Visit': a.page_visits
          };
        });

        this.excelService.exportAsExcelFile(
          exportData,
          "Category List"
        );
        this.exportFlag = false;
      }
    });
  }


  public productCategoryList:any = [];

  loadProductCategory() {
    this.AdminService.loadNestedCategory({}).subscribe((response: any) => {
      if (response.success == 1) {
        this.productCategoryList = response.categories;
      
      } else {
        this.categoryList = [];
      }
    });
  }

  /* Code for exporting catgory ends here */
}


