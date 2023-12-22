import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Chat } from '../../models/chat.class';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';

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
  accountService!: AccountService;
  chatService!: ChatService;
  messageService!: MessageService;

  constructor() {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
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

  openChannel(collId: string, channelId: string) {
    this.messageService.collId = collId;
    this.messageService.channelId = channelId;
    this.chatService.getChannel(channelId).then((channel: Channel) => {
      this.chatService.currentChannel = channel;
      this.chatService.openChatEmitter.next({ chatColl: collId });
    });
  }

  openChat(chatColl: string, accId: string) {
    for (let i = 0; i < this.chatService.chats.length; i++) {
      if (this.privateChatExists(i, accId)) {
        this.messageService.collId = chatColl;
        this.messageService.channelId = this.chatService.chats[i].id;
        this.chatService.currentChat = this.chatService.chats[i];
        this.emitChatInfo(chatColl, accId);
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
    let newChat = new Chat('', [this.authService.userId, accId]);
    this.chatService.addChatOrChannel(newChat, 'chats');
    this.emitChatInfo(chatColl, accId);
  }

  emitChatInfo(chatColl: string, accId: string) {
    this.chatService.openChatEmitter.next({
      chatColl: chatColl,
      accountId: accId,
    });
  }
}
