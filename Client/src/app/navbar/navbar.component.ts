import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../authentication/authentication-service';
import { PublicConstants } from '../shared/public.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private publicConstants: PublicConstants, private router: Router, private toastrService: ToastrService) { }

  lang;

  loadedUser = new User();

  private userSub: Subscription = new Subscription();
  authObsSub: Subscription = new Subscription();


  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.loadedUser = this.authService.user;
    if (this.loadedUser.email == this.publicConstants.defaultInvalid || this.loadedUser.token == this.publicConstants.defaultInvalid || this.loadedUser.id == this.publicConstants.defaultInvalid) {
      this.isAuthenticated = false;
    }
    else {
      this.isAuthenticated = true;
    }

    this.userSub = this.authService.userSub.subscribe(user => {
      if (user.email == this.publicConstants.defaultInvalid || user.token == this.publicConstants.defaultInvalid || user.id == this.publicConstants.defaultInvalid) {
        this.isAuthenticated = false;
      }
      else {
        this.isAuthenticated = true;
      }

    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  changeLang(lang) {
    localStorage.setItem("lang", lang);
    window.location.reload();
  }
  onLoginAnonymously(){
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.loginAnonymously();
    this.authObsSub = authObs.subscribe(resData => {
      this.router.navigate(['/input']);
        this.toastrService.success(this.publicConstants.loginSuccess);
    });
  }

  

}
