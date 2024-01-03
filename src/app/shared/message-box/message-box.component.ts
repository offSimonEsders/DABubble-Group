import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Account } from '../../models/account.class';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from '../../models/message.class';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss',
})
export class MessageBoxComponent implements OnInit {
  authService!: AuthService;
  chatService!: ChatService;
  messageService!: MessageService;
  accountService!: AccountService;
  @ViewChild('form') sendMessageForm!: NgForm;
  currentCollection = '';
  chatId!: string;
  chatWithAccount!: Account;
  private openChatSub!: Subscription;

  constructor() {
    this.authService = inject(AuthService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
        if (data.accountId) {
          this.accountService.getAccount(data.accountId).then((account) => {
            this.chatWithAccount = account;
          });
        }
      },
    });
  }

  async sendMessage() {
    let newMessage = this.createMessage();
    this.messageService
      .addMessage(newMessage, this.currentCollection, this.chatId)
      .then((doc: any) => {
        updateDoc(doc, { id: doc.id });
        this.sendMessageForm.reset();
      });
  }

  createMessage() {
    return new Message(
      '',
      this.chatId,
      this.authService.user.accountId,
      +new Date(),
      this.sendMessageForm.value.message,
      [],
      0,
      0
    );
  }

  setPlaceholder() {
    if (
      this.currentCollection === 'channels' &&
      this.chatService.currentChannel
    ) {
      this.chatId = this.chatService.currentChannel.id;
      return `Nachricht an #${this.chatService.currentChannel.name}`;
    } else if (this.currentCollection === 'chats' && this.chatWithAccount) {
      this.chatId = this.chatService.currentChat.id;
      return `Nachricht an ${this.chatWithAccount.name}`;
    } else {
      return 'Starte eine neue Nachricht';
    }
  }
}
