import { Component} from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { Account } from '../models/account.class';
import { CommonModule } from '@angular/common';

import { ChannelsComponent } from '../nav-bar/channels/channels.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserAccessComponent } from '../user-access/user-access.component';
import { LoginComponent } from '../user-access/login/login.component';
import { ProviderService } from '../services/provider.service';
import { OpenChatFromProfileViewService } from '../services/open-chat-from-profile-view.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [AvatarComponent,CommonModule,ChannelsComponent,EditProfileComponent],
  providers: [ChannelsComponent,EditProfileComponent,UserAccessComponent,LoginComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
  
})
export class ProfileViewComponent{
  account!:Account;
  openChatBoolean:boolean = false;
  edit:boolean = false;
  
  constructor(private authService:AuthService, private Provider:ProviderService,public open:OpenChatFromProfileViewService){
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
    this.Provider.closeDropDownProvider();
  }
}
