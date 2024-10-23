import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';
import { ExcelService } from 'src/app/_services/excel.service';
import { PagerService } from 'src/app/_services/pager-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.loadProduct();
  }



  public productList: any = [];
  public categoryList: any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    status:"",
    category_id: "",
    
  };
  public totalProducts: number = 0;
  public deleteObj: any = {};
  public isDeletePopup: boolean = false;

  //Sorting Functions

  public sortByActive: any = false;

  sortByName() {
    if (this.sortByActive == false) {
      this.productList.sort((a, b) => a.name.localeCompare(b.name));
      console.log(this.productList)
      this.sortByActive = true
    }
    else {
      this.productList.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByActive = false;
      console.log(this.productList)
    }
  }

  // Search Filter Function

  searchList(search) {
    this.dataObj.page = 1;
    this.dataObj.search = search;
    this.loadProduct();
  }

  searchCategory(category) {
    console.log('Selected category:', category); // Check this log
    this.dataObj.page = 1;
    this.dataObj.category = category;
    this.loadProduct();
  }

  // Pagination Function

  changePage(page) {
    this.dataObj.page = page;
    this.loadProduct();
  }

  // Projects Listing  API

  loadProduct() {
    this.AdminService.loadProducts(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.productList = response.products;
        this.categoryList = response.category_list;
        // this.productList.forEach((project) => {
        //   if (
        //     project.category &&
        //     this.productList.indexOf(project.category) === -1
        //   ) {
        //     this.productList.push(project.category);
        //   }
        // });

        this.dataObj.total = response.total_product;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.productList = [];
        this.dataObj.total = 0;
        console.log(this.productList, "empttyyyyyyyyy");
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
      this.loadProduct();
    }
  }
  // Project Change Status  API

  changeStatus(id) {
    this.AdminService.changeStatusProduct({ id: id }).subscribe((response: any) => {
      if (response.success == 1) {
        this.loadProduct();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  // Project Delete Popup Function

  deleteCategories(products) {
    if (!this.isDeletePopup) {
      this.isDeletePopup = true;
      this.deleteObj = products;
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
      this.AdminService.deleteProduct({ id: this.deleteObj.id }).subscribe((response: any) => {
        if (response.success == 1) {
          this.isDeletePopup = false;
          this.toastr.success(response.message);
          this.loadProduct();
        }
      });
    }
  }


  public exportFlag: boolean = false;

  exportAsXLSX(): void {
    let exportObj: any = {
      page: 0,
      limit: 100000,
    };
    this.exportFlag = true;
    this.AdminService.loadProducts(exportObj).subscribe((response: any) => {
      var responseData = JSON.parse(JSON.stringify(response));

      if (responseData.success) {
        var exportData = responseData.products.map(function (a, index) {

          return {
            'SR.NO': index + 1,
            'Name': a.category_name,
            'Category':a.name,
            'Code/Color':a.code,
            'Inquiry Count': a.inquiry_count,
            'Page Visit': a.page_visits
          };
        });

        this.excelService.exportAsExcelFile(
          exportData,
          "Product List"
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




}


