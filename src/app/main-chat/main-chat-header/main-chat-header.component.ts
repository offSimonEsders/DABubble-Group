import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';
import { Channel } from '../../models/channel.class';
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
  currentChannel!: Channel;
  chatWithAccount!: Account;

  constructor() {
    this.authService = inject(AuthService);
    this.chatService = inject(ChatService);
    this.accountService = inject(AccountService);
  }

  /**
   * The ngOnInit function subscribes to an openChatEmitter and retrieves chat data based on the provided
   * chat collection and chat ID.
   */
  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
        this.currentChannel = this.chatService.currentChannel;
        if (data.accountId) {
          this.accountService.getAccount(data.accountId).then((account) => {
            this.chatWithAccount = account;
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }

  /**
   * The function translates the avatar elements based on the index and the number of member IDs in the current chat.
   * @param {number} index - Index of avatar element.
   * @returns a string value representing a CSS transform property.
   */
  translateAvatarElements(index: number) {
    if (index < 2 && this.currentChannel.memberIds.length > 2) {
      return 'translateX(' + 20 / (index + 1) + 'px)';
    } else if (index < 1 && this.currentChannel.memberIds.length === 2) {
      return 'translateX(' + 10 / (index + 1) + 'px)';
    } else {
      return 'translateX(0px)';
    }
  }
}
