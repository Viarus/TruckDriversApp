import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './authentication-service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error : string = null;

  SwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){
    if (!form.valid){
      return
    }
      const email = form.value.email;
      const password = form.value.password;
      
      this.isLoading = true;
      if (this.isLoginMode){

      }
      else{
        this.authService.signup(email, password).subscribe(
          resData => {
            console.log(resData);
            this.error = null;
            this.isLoading = false;
          },
          error => {
            console.log(error);
            this.error = "Wystąpił błąd!";
            this.isLoading = false;
          }
        );
      }
      form.reset();
  }

}
