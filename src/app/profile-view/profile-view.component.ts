import { Component, OnInit} from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { Account } from '../models/account.class';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ChannelsComponent } from '../nav-bar/channels/channels.component';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [AvatarComponent,CommonModule,ChannelsComponent],
  providers: [ChannelsComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent implements OnInit{
  account!:Account;
  openChatBoolean:boolean = false;

  ngOnInit(): void {
  }
  
  constructor(private authService:AuthService,private channels:ChannelsComponent, private head:HeaderComponent){
    this.account = this.authService.profileViewAccount;
  }

  openWithChat(){
    this.openChatBoolean = true;
    this.openChat();
  }

  openChat(){
    if(this.openChatBoolean){
      this.channels.openChat('chats', this.account.accountId);
      this.openChatBoolean = false;
    }
    this.head.closeDropDown();
  }
}
