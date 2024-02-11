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
import { EditChannelComponent } from '../main-chat/edit-channel/edit-channel.component';
import { EditProfileComponent } from '../profile-view/edit-profile/edit-profile.component';
import { UserAccessComponent } from '../user-access/user-access.component';
import { LoginComponent } from '../user-access/login/login.component';
import { ChannelsComponent } from '../nav-bar/channels/channels.component';
import { UiService } from '../services/UiService.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent, CommonModule, ProfileViewComponent, NavHeadComponent, SearchBarComponent],
  providers:[]
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


  constructor(private router: Router, public storageservice: StorageService,private UiService:UiService) {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);    
    this.chatService = inject(ChatService);
  }


  swichMobileChat(){
    this.hideBar = !this.hideBar;
  }

  ngOnInit(): void {
    this.UiService.dropDownObservable$.subscribe((value: boolean) => {
      this.dropDown = value;
    });

    this.UiService.profileViewObservable$.subscribe((value: boolean) => {
      this.profileView = value;
    });
    this.account = this.accountService.accounts.find(
      (account) => account.id === this.authService.userId
    );
  }

  async logOut() {
    this.authService.userId = '';
    await this.authService.authServiceLogOut();
  }

  switchDropDown() {
    this.UiService.setDropDown(!this.dropDown);
  }

  closeDropDown() {
    this.UiService.closeDropDownProvider();
  }

  openProfileView() {
    this.authService.profileViewAccount = this.authService.user;
    this.UiService.setProfileView(true);
  }
}