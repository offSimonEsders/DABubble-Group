import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.class';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-intro',
  standalone: true,
  templateUrl: './chat-intro.component.html',
  styleUrl: './chat-intro.component.scss',
  imports: [ChannelBoxComponent, AvatarComponent, CommonModule],
})
export class ChatIntroComponent implements OnInit, OnDestroy {
  chatSelected!: string;
  ownChat!: boolean;
  account: Account | undefined;
  authService!: AuthService;
  accountService!: AccountService;
  chatService!: ChatService;
  messageService!: MessageService;
  private openChatSub!: Subscription;

  constructor() {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
  }

  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.chatSelected = data.chatColl;
        if (data.accountId) {
          this.getAccount(data.accountId);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }

  getAccount(docId: string) {
    this.account = undefined;
    this.accountService.getAccount(docId).then((account) => {
      this.account = account;
      this.checkIfOwnChat();
    });
  }

  checkIfOwnChat() {
    if (this.account?.accountId === this.authService.user.accountId) {
      this.ownChat = true;
    } else {
      this.ownChat = false;
    }
  }
}
