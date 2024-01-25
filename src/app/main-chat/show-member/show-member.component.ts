import { Component, inject } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.class';

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

  constructor(private accountService:AccountService){
    this.chatService = inject(ChatService);
    this.InfoCh = this.chatService.currentChannel;
  }

}
