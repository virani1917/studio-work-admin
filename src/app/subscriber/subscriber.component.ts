import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from '../_services/pager-service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private toastr: ToastrService,
    private pagerService: PagerService,
  ) { }

  ngOnInit() {
    this.loadSubscriber();
  }

  public subscriberList:any = [];
  public dataObj: any = {
    search: "",
    limit: 10,
    page: 1,
    id: "",
  };

  public totalsubscriber: number = 0;

  loadSubscriber() {
    this.AdminService.loadSubscriber(this.dataObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.subscriberList = response.news_letters;
        this.dataObj.total = response.total_subscriber;
        this.setUsersPage(this.dataObj.page, 0);
      } else {
        this.subscriberList = [];
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
      this.loadSubscriber();
    }
  }

  
 
}
