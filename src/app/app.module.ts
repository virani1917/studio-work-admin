import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProjectListComponent } from './manage_project/project-list/project-list.component';
//import { AddProjectComponent } from './manage_project/add-project/add-project.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { ChangePasswordComponent } from './manage_user/change-password/change-password.component';
import { UpdateProfileComponent } from './manage_user/update-profile/update-profile.component';
import { ListComponent } from './manage_team/list/list.component';
import { AddComponent } from './manage_team/add/add.component';
import { PagerService } from './_services/pager-service';
//import { AddNewsComponent } from './manage_news/add-news/add-news.component';
// import { ListNewsComponent } from './manage_news/list-news/list-news.component';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { CareerInquiryComponent } from './career-inquiry/career-inquiry.component';
import { StudioDetailsComponent } from './studio-details/studio-details.component';
import { CategoryListComponent } from './manage-category/category-list/category-list.component';
import { AddCategoryComponent } from './manage-category/add-category/add-category.component';
import { ProductListComponent } from './manage-product/product-list/product-list.component';
import { SaveProductComponent } from './manage-product/save-product/save-product.component';
import { DatePipe } from "@angular/common";
import { SubscriberComponent } from './subscriber/subscriber.component';




@NgModule({
  declarations: [AppComponent, LoginComponent,  HomeComponent, DashboardComponent,  ChangePasswordComponent, UpdateProfileComponent, ListComponent, AddComponent, InquiryListComponent, CareerInquiryComponent, StudioDetailsComponent, CategoryListComponent, AddCategoryComponent, ProductListComponent, SaveProductComponent, SubscriberComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],

  providers: [
    DatePipe,
    PagerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
