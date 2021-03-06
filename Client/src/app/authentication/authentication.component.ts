import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { PublicConstants } from '../shared/constants/public.constants';
import { AuthResponseData, AuthService } from '../shared/services/authentication-service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService, private publicConstants: PublicConstants) { }

  user = new User();

  userSubs = new Subscription();
  authObsSubs = new Subscription();

  ngOnInit() {
    this.userSubs = this.authService.userSub.subscribe(resData => {
      this.user = resData;
    });
  }
  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.authObsSubs.unsubscribe();
  }

  isLoginMode: boolean = true;
  isLoading: boolean = false;

  SwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signup(email, password);
    }
    this.authObsSubs = authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/input']);
        this.toastrService.success(this.publicConstants.loginSuccess);
      },
      error => {
        this.isLoading = false;
        this.toastrService.error(this.publicConstants.wrongDataEnteredError);
      }
    );
    form.reset();
  }

}
