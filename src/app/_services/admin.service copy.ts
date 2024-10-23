import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { unsupported } from "@angular/compiler/src/render3/view/util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  private objservableadmin = new Subject<any>();


  // Set Token API
  setToken(objLoggedInUser) {
    this.objservableadmin.next(objLoggedInUser);
    localStorage.setItem("adminDetails", objLoggedInUser);

  }
  // Get token API
  getToken() {
    return localStorage.getItem("adminDetails");
  }

  getLoggedInUser() {
    const userData = JSON.parse(localStorage.getItem('adminDetails'));
    return of(userData);
  }
  // Logged In Check API
  isLoggedIn() {
    return this.getToken() != null;
  }
  // Logout  API
  logout() {
    localStorage.removeItem("adminDetails");
    this.router.navigate(["/login"]);
  }
  

  public user: any = JSON.parse(this.getToken());

  // Admin Login API
  adminLogin(data): Observable<any> {
    
    const apiUrl = environment.url + "login";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

  checkToken(data): Observable<any> {
    var user: any = JSON.parse(this.getToken());

    const apiUrl = environment.url + "checktoken";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.access_token,
      }),
  };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }


  // Project Listing API

  loadProjects(data): Observable<any> {
    const apiUrl = environment.url + "manage_projects/list";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

  dashboard(data): Observable<any> {
    var user: any = JSON.parse(this.getToken());
    const apiUrl = environment.url + "dashboard";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

  // Team Listing API

  loadteam(data): Observable<any> {
    const apiUrl = environment.url + "manage_teams/list";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

  changeStatusTeam(data): Observable<any> {
    const apiUrl = environment.url + "manage_teams/change_status";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Team Delete API

  deleteTeam(data): Observable<any> {
    const apiUrl = environment.url + "manage_teams/delete";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Team Save/Edit API

  addTeam(data): Observable<any> {
    const apiUrl = environment.url + "manage_teams/save";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }
  // Team Detail API

  teamDetail(data): Observable<any> {
    const apiUrl = environment.url + "manage_teams/details";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }

  // Team Listing API

  loadnews(data): Observable<any> {
    const apiUrl = environment.url + "manage_news_media/list";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  changeStatusNews(data): Observable<any> {
    const apiUrl = environment.url + "manage_news_media/change_status";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Team Delete API

  deleteNews(data): Observable<any> {
    const apiUrl = environment.url + "manage_news_media/delete";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Team Save/Edit API

  addNews(data): Observable<any> {
    const apiUrl = environment.url + "manage_news_media/save";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }
  // Team Detail API

  newsDetail(data): Observable<any> {
    const apiUrl = environment.url + "manage_news_media/details";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }


  // Project Change Status API

  changeStatus(data): Observable<any> {
    const apiUrl = environment.url + "manage_projects/change_status";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Project Delete API

  deleteProject(data): Observable<any> {
    const apiUrl = environment.url + "manage_projects/delete";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Project Save/Edit API

  addProject(data): Observable<any> {
    const apiUrl = environment.url + "manage_projects/save";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }
  // Project Detail API

  projectDetail(data): Observable<any> {
    const apiUrl = environment.url + "manage_projects/details";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }
  
  // Change Password API

  changePassword(data): Observable<any> {
    const apiUrl = environment.url + "manage_user/change_password";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }

  // Update Profile API

  updateProfile(data): Observable<any> {
    const apiUrl = environment.url + "manage_user/update_profile";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http.post<any>(apiUrl, data, httpOptions).pipe();
  }

  // Inquiry Listing API

  loadInquiry(data): Observable<any> {
    const apiUrl = environment.url + "manage_inquiries/list";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

  // Career Inquiry Listing API

  loadcareerInquiry(data): Observable<any> {
    const apiUrl = environment.url + "manage_joining_request/list";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }
  // Inquiry Change API

  changeInquiryStatus(data): Observable<any> {
    const apiUrl = environment.url + "manage_inquiries/change_status";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

  changecareerInquiryStatus(data): Observable<any> {
    const apiUrl = environment.url + "manage_joining_request/change_status";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.user.value.access_token,
      }),
    };
    return this.http
      .post<any>(apiUrl, JSON.stringify(data), httpOptions)
      .pipe();
  }

}
