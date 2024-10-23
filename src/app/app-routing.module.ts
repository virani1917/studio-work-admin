import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './manage_user/change-password/change-password.component';
import { UpdateProfileComponent } from './manage_user/update-profile/update-profile.component';
import { ListComponent } from './manage_team/list/list.component';
import { AddComponent } from './manage_team/add/add.component';

import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { AuthGuard } from './guards/auth.guard';
import { CareerInquiryComponent } from './career-inquiry/career-inquiry.component';
import { StudioDetailsComponent } from './studio-details/studio-details.component';
import { CategoryListComponent } from './manage-category/category-list/category-list.component';
import { AddCategoryComponent } from './manage-category/add-category/add-category.component';
import { ProductListComponent } from './manage-product/product-list/product-list.component';
import { Sauce } from 'protractor/built/driverProviders';
import { SaveProductComponent } from './manage-product/save-product/save-product.component';
import { SubscriberComponent } from './subscriber/subscriber.component';



const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo : 'login',
  //   pathMatch : "full"
  // },
  {
    path: "",
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "category-list",
        component: CategoryListComponent,
      },

      {
        path: "manage-category/add-category",
        component: AddCategoryComponent,
      },
      {
        path: 'manage-category/update/:slug',
        component: AddCategoryComponent,
        data: {
          title: 'Update Category'
        }
      },
      {
        path:'subscriber',
        component:SubscriberComponent,
      },

      {
        path: "product-list",
        component: ProductListComponent,
      },
      {
        path: "list",
        component: ListComponent,
        data: {
          title: 'Team'
        }
      },
      {
        path: 'manage_team/add',
        component: AddComponent,
        data: {
          title: 'Add Team'
        }
      },

      {
        path: 'manage_team/update/:id',
        component: AddComponent,
        data: {
          title: 'Update Team'
        }
      },
      {
        path: 'manage-product/update/:slug',
        component: SaveProductComponent,
        data: {
          title: 'Update Product'
        }
      },
      {
        path: "manage-product/save-product",
        component: SaveProductComponent,
      },

      {
        path: "studio",
        component: StudioDetailsComponent,
      },
      {
        path: "career",
        component: CareerInquiryComponent,
      },
  
      {
        path: "profile/change_password",
        component: ChangePasswordComponent,
      },
      {
        path: "profile",
        component: UpdateProfileComponent,
      },
      {
        path: "inquiry",
        component: InquiryListComponent,
      },

    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: {
      title: 'Change Password'
    }
  },
  {
    path: "**",
    redirectTo: '/login',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
