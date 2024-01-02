import { Component, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.class';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent,CommonModule,ProfileViewComponent],
})
export class HeaderComponent implements OnInit {
  authService!: AuthService;
  accountService!: AccountService;
  account!: Account;
  accountStatus!: string;
  accountName!: string;
  dropDown:boolean = false;
  profileView:boolean = false;

  constructor(private router: Router) {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.getAccount();
  }

  switchDropDown(){
    this.dropDown = !this.dropDown;
  }

  logOut(){
    this.router.navigate(['']);
  }

  getAccount() {
    this.accountService.getAccount(this.authService.userId).then((account) => {
      this.account = account;
    });
  }

  closeDropDown(){
    this.dropDown = false;
    this.profileView = false;
  }

  openProfileView(){
    this.authService.profileViewAccount = this.account;
    this.profileView = true;
    this.dropDown = false;
    
  }
}
