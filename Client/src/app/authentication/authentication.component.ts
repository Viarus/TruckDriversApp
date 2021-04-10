import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'Models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './authentication-service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router) { }

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
  error: string = null;

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
        console.log(resData);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/input'])
      },
      error => {
        console.log(error);
        this.error = "Wystąpił błąd!";
        this.isLoading = false;
      }
    );
    form.reset();
  }

}
