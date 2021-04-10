import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/authentication-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  private userSub: Subscription = new Subscription();

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.userSub = this.authService.userSub.subscribe(user => {
      if (user.email == "notValid" || user.token == "notValid" || user.id == "notValid") {
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

}
