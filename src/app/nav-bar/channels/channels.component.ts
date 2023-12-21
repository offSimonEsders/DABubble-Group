import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Chat } from '../../models/chat.class';
import { updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent, AvatarComponent],
})
export class ChannelsComponent implements OnInit {
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;

  authService!: AuthService;
  chatService!: ChatService;
  accountService!: AccountService;

  constructor() {
    this.accountService = inject(AccountService);
    this.chatService = inject(ChatService);
    this.authService = inject(AuthService);
  }

  ngOnInit(): void {}

  hideChannels() {
    console.log(this.accountService.accounts);
    this.openCh = !this.openCh;
    this.rotateCh = !this.rotateCh;
  }

  hidePersonal() {
    this.openPe = !this.openPe;
    this.rotatePe = !this.rotatePe;
  }

  openNewChannelDiv() {
    this.chatService.channelCreated(true);
  }

  openChannel(collId: string, chatId: string) {
    this.emitChatInfo(collId, chatId);
  }

  async openChat(chatColl: string, accId: string) {
    for (let i = 0; i < this.chatService.chats.length; i++) {
      if (this.privateChatExists(i, accId)) {
        this.emitChatInfo(chatColl, this.chatService.chats[i].id);
        break;
      }
      if (this.noPrivateChatExists(i)) {
        this.createNewPrivateChat(chatColl, accId);
      }
    }
  }

  privateChatExists(index: number, accId: string) {
    return (
      this.chatService.chats[index].memberIds.includes(accId) &&
      this.chatService.chats[index].memberIds.includes(this.authService.userId)
    );
  }

  noPrivateChatExists(i: number) {
    return i === this.chatService.chats.length - 1;
  }

  createNewPrivateChat(chatColl: string, accId: string) {
    let newChatId = '';
    let newChat = new Chat('', [this.authService.userId, accId]);
    this.chatService.addChat(newChat, 'chats').then((doc: any) => {
      updateDoc(doc, { id: doc.id });
      newChatId = doc.id;
    });
    this.emitChatInfo(chatColl, newChatId);
  }

  emitChatInfo(chatColl: string, chatId: string) {
    this.chatService.openChatEmitter.next({
      chatColl: chatColl,
      chatId: chatId,
    });
  }
}
