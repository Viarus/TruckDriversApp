import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLoginMode: boolean = true;

  SwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){
    console.log(form.value)
    form.reset();
  }

}
