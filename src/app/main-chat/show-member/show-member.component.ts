import { Component, inject } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { MainChatHeaderComponent } from '../main-chat-header/main-chat-header.component';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../header/header.component';
import { ProviderService } from '../../services/provider.service';

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

  constructor(private authService:AuthService,private providers:ProviderService,){
    this.chatService = inject(ChatService);
    this.InfoCh = this.chatService.currentChannel;
  }

  close(){
    this.providers.openEditViewMember();
  }

  openAddUser(){
    this.providers.openEditViewMember();
    this.providers.openEditViewMemberEdit();
  }

  async GoToSetProfileViewAccount(id:string){
    await this.authService.setprofileViewAccount(id);
    this.providers.openEditViewMember();
    this.providers.openProfileView();
  }
}
