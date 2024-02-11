import { Component, inject } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { MainChatHeaderComponent } from '../main-chat-header/main-chat-header.component';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../header/header.component';
import { UiService } from '../../services/UiService.service';

@Component({
  selector: 'app-show-member',
  standalone: true,
  imports: [CommonModule,AvatarComponent],
  templateUrl: './show-member.component.html',
  styleUrl: './show-member.component.scss',
  
})
export class ShowMemberComponent {
  InfoCh!:Channel;
  chatService!:ChatService;
  UserName!:string[];

  constructor(private authService:AuthService,private UiService:UiService,){
    this.chatService = inject(ChatService);
    this.InfoCh = this.chatService.currentChannel;
  }

  close(){
    this.UiService.openEditViewMember();
  }

  openAddUser(){
    this.UiService.openEditViewMember();
    this.UiService.openEditViewMemberEdit();
  }

  async GoToSetProfileViewAccount(id:string){
    await this.authService.setprofileViewAccount(id);
    this.UiService.openEditViewMember();
    this.UiService.openProfileView();
  }
}
