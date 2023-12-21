import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';
import { Channel } from '../../models/channel.class';
import { Chat } from '../../models/chat.class';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account.class';

@Component({
  selector: 'app-main-chat-header',
  standalone: true,
  templateUrl: './main-chat-header.component.html',
  styleUrl: './main-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule, ChannelBoxComponent],
})
export class MainChatHeaderComponent implements OnInit, OnDestroy {
  authService!: AuthService;
  chatService!: ChatService;
  accountService!: AccountService;
  private openChatSub!: Subscription;
  currentCollection = '';
  currentChat!: Channel | Chat;
  chatWithAccountId!: Account;

  constructor() {
    this.authService = inject(AuthService);
    this.chatService = inject(ChatService);
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
        if (data.chatId) {
          this.chatService.getChat(data.chatColl, data.chatId).then((data) => {
            this.currentChat = data;
            if (this.currentCollection === 'chats') {
              this.getChatPartner();
            }
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }

  /**
   * The function retrieves the account information of the chat partner based on the memberIds of the current chat.
   */
  getChatPartner() {
    let id = this.currentChat.memberIds.filter(
      (id) => id !== this.authService.userId
    );
    this.accountService.getAccount(id[0]).then((account) => {
      this.chatWithAccountId = account;
    });
  }

  /**
   * The function translates the avatar elements based on the index and the number of member IDs in the current chat.
   * @param {number} index - Index of avatar element.
   * @returns a string value representing a CSS transform property.
   */
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
