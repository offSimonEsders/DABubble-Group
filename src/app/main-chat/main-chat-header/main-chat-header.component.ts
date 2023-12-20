import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';
import { Channel } from '../../models/channel.class';
import { Chat } from '../../models/chat.class';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-main-chat-header',
  standalone: true,
  templateUrl: './main-chat-header.component.html',
  styleUrl: './main-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule, ChannelBoxComponent],
})
export class MainChatHeaderComponent implements OnInit, OnDestroy {
  chatService!: ChatService;
  accountService!: AccountService;
  private openChatSub!: Subscription;
  currentCollection = '';
  accountStatus = 'online';
  currentChat!: Channel | Chat;

  constructor() {
    this.chatService = inject(ChatService);
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
        this.chatService.getChat(data.chatColl, data.chatId).then((data) => {
          this.currentChat = data;
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }

  translateAvatarElements(index: number) {
    if (index < 2 && this.currentChat.memberIds.length > 2) {
      return 'translateX(' + 20 / (index + 1) + 'px)';
    } else if (index < 1 && this.currentChat.memberIds.length === 2) {
      return 'translateX(' + 10 / (index + 1) + 'px)';
    } else {
      return 'translateX(0px)';
    }
  }
}
