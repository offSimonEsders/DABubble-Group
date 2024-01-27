import { Component, inject } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.class';
import { MainChatHeaderComponent } from '../main-chat-header/main-chat-header.component';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-show-member',
  standalone: true,
  imports: [CommonModule,AvatarComponent],
  templateUrl: './show-member.component.html',
  styleUrl: './show-member.component.scss'
})
export class ShowMemberComponent {
  InfoCh!:Channel;
  chatService!:ChatService;
  UserName!:string[];

  constructor(private accountService:AccountService,private closeDiv:MainChatHeaderComponent,private authService:AuthService, private head:HeaderComponent, public div:MainChatHeaderComponent){
    this.chatService = inject(ChatService);
    this.InfoCh = this.chatService.currentChannel;
  }

  close(){
    this.closeDiv.openEditViewMember();
  }

  openAddUser(){
    this.closeDiv.openEditViewMember();
    this.closeDiv.openEditViewMemberEdit();
  }

  async GoToSetProfileViewAccount(id:string){
    await this.authService.setprofileViewAccount(id);
    this.div.openEditViewMember();
    this.div.openProfileView();
  }
}
