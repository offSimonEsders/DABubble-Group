import { Component } from '@angular/core';
import { Account } from '../models/account.class';
import { AuthService } from '../services/auth.service';
import { ChannelsComponent } from '../nav-bar/channels/channels.component';
import { HeaderComponent } from '../header/header.component';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { MainChatHeaderComponent } from '../main-chat/main-chat-header/main-chat-header.component';
import { OpenChatFromProfileViewService } from '../services/open-chat-from-profile-view.service';
@Component({
  selector: 'app-profile-view-member',
  standalone: true,
  imports: [AvatarComponent,CommonModule],
  providers: [ChannelsComponent],
  templateUrl: './profile-view-member.component.html',
  styleUrl: './profile-view-member.component.scss'
})
export class ProfileViewMemberComponent {
  account!:Account;
  openChatBoolean:boolean = false;
  edit:boolean = false;
  
  constructor(private authService:AuthService,private channels:ChannelsComponent, private head:HeaderComponent,private close:MainChatHeaderComponent,public open:OpenChatFromProfileViewService){
    this.account = this.authService.profileViewAccount;
  }

  switchEdit(){
    this.edit = !this.edit;
  }

  openWithChat(){
    this.openChatBoolean = true;
    this.openChat();
  }

  openChat(){
    if(this.openChatBoolean){
      this.open.openChat('chats', this.account.accountId);
      this.openChatBoolean = false;
    }
    this.close.profileView = false;
    this.close.openEditMember = false;
    this.open.openMobileView();
  }
}
