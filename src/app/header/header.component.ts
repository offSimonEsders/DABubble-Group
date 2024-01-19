import { Component, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.class';
import { StorageService } from '../services/storage.service';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { NavHeadComponent } from '../nav-bar/nav-head/nav-head.component';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent, CommonModule, ProfileViewComponent, NavHeadComponent, SearchBarComponent],
})
export class HeaderComponent implements OnInit {
  authService!: AuthService;
  accountService!: AccountService;
  accountStatus!: string;
  accountName!: string;
  dropDown: boolean = false;
  profileView: boolean = false;
  account!: Account | undefined;
  swich: boolean = true;
  hideBar:boolean = false;
  chatService!:ChatService;


  constructor(private router: Router, public storageservice: StorageService) {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);    
    this.chatService = inject(ChatService);
  }


  swichMobileChat(){
    debugger;
    this.hideBar = !this.hideBar;
  }

  ngOnInit(): void {
    this.account = this.accountService.accounts.find(
      (account) => account.id === this.authService.userId
    );
    if (this.account) {
      console.log(this.account);
    }
  }

  switchDropDown() {
    this.dropDown = !this.dropDown;
  }

  logOut() {
    this.authService.authServiceLogOut();
    this.router.navigate(['']);
  }

  closeDropDown() {
    this.dropDown = false;
    this.profileView = false;
  }

  openProfileView() {
    this.authService.profileViewAccount = this.authService.user;
    this.profileView = true;
    this.dropDown = false;
  }
}