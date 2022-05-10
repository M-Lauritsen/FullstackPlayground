import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn!: boolean;
  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this._accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this._accountService.logout();
    this.loggedIn = false;
  }

  getCurrentUser() {
    this._accountService.currentUser$.subscribe(
      (user) => {
        console.log(user);
        this.loggedIn = !!user;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
