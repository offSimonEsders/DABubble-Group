import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Account } from '../../models/account.class';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from '../../models/message.class';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { updateDoc } from '@angular/fire/firestore';
import { Answer } from '../../models/answer.class';
import { ResizeTextareaDirective } from '../message/resize-textarea.directive';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from "../avatar/avatar.component";
import { ThreadComponent } from '../../thread/thread.component';

@Component({
    selector: 'app-message-box',
    standalone: true,
    templateUrl: './message-box.component.html',
    styleUrl: './message-box.component.scss',
    imports: [FormsModule, ResizeTextareaDirective, PickerModule, CommonModule, AvatarComponent]
})
export class MessageBoxComponent implements OnInit {
  authService!: AuthService;
  chatService!: ChatService;
  messageService!: MessageService;
  accountService!: AccountService;
  @ViewChild('form') sendMessageForm!: NgForm;
  @Input() secondaryChat!: boolean;
  currentCollection = '';
  chatId!: string;
  chatWithAccount!: Account;
  openChatSub!: Subscription;
  emojiPickeropened = false;
  emojiEmitter = new EventEmitter<any>();
  userPickerOpened: Boolean = false;

  constructor() {
    this.authService = inject(AuthService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
    this.accountService = inject(AccountService);
    
  }

  ngOnInit(): void {
    this.getAllNamesOfChannelMembers();
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
    this.emojiEmitter.subscribe((data) => {
      this.addEmoji(data);
    });    
    
  }

  async onSubmit() {
    if (this.secondaryChat) {
      this.sendAnswer();
    } else {
      this.sendMessage();
    }
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

  async updatemessage(messageID: any,) {
    let message: Message =  await this.messageService.getMessage(messageID);
    this.messageService.updateAnswerAmount(this.chatService.currentChannel.id, message.id, message.answerAmount + 1);
  }

  async sendAnswer() {
    let newAnswer = this.createAnswer();
    this.messageService
      .addAnswer(
        newAnswer,
        this.chatService.currentChannel.id,
        this.messageService.messageId
      )
      .then((doc: any) => {
        updateDoc(doc, { id: doc.id});
        this.sendMessageForm.reset();
      });
      this.updatemessage(this.messageService.messageId);
    
     
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
      0,
      false
    );
  }

  createAnswer() {
    return new Answer(
      '',
      this.chatService.currentChannel.id,
      this.messageService.messageId,
      this.authService.user.accountId,
      +new Date(),
      this.sendMessageForm.value.message,
      [],
      0,
      0,
      true
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

  togglePicker() {
    this.emojiPickeropened = !this.emojiPickeropened;
  }

  toggleUserPicker() {
    this.userPickerOpened = !this.userPickerOpened;
  }

  async getAllNamesOfChannelMembers() {
    this.chatService.currentChannelNames = [];
    this.chatService.currentChannelAccounts = [];
    if(this.chatService.currentChannel){
      for (let i = 0; i < this.chatService.currentChannel.memberIds.length; i++) {
        let currenAccount = await this.accountService.getAccount(this.chatService.currentChannel.memberIds[i]);
        if(!this.chatService.currentChannelNames.includes(currenAccount.name)){
          this.chatService.currentChannelNames.push(currenAccount.name);
          this.chatService.currentChannelAccounts.push(currenAccount);
        }
      }
    }
  }
  
  addUserName(user: any) {
    this.sendMessageForm.value.message = this.sendMessageForm.value.message + '@' + user.name + ' ';
  }

  addEmoji(data: any) {
    const message = this.sendMessageForm.value.message;
    const sym = data.emoji.unified.split('_');
    const emoji = String.fromCodePoint(+('0x' + sym));
    this.sendMessageForm.value.message = message + emoji;
    this.togglePicker();
  }

  @HostListener('document:click', ['$event'])
  onClick() {
    if (this.emojiPickeropened) {
      this.togglePicker();
    }
    if (this.userPickerOpened) {
      this.toggleUserPicker();
    }
  }

  showChange() {
  }
}
