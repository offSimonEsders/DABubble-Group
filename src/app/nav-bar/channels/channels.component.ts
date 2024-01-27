import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Chat } from '../../models/chat.class';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';
import { updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { HomeComponent } from '../../home/home.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent, AvatarComponent],
})
export class ChannelsComponent {
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;

  authService!: AuthService;
  accountService!: AccountService;
  chatService!: ChatService;
  messageService!: MessageService;
  home!:HomeComponent;
  head!:HeaderComponent;
  //@ViewChild('headerElement', { static: false }) head!: HeaderComponent;

  constructor(private auth: Auth) {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
    this.head = inject(HeaderComponent);
    this.home = inject(HomeComponent);

    this.sortAccounts();
  }

  sortAccounts() {
    this.accountService.accounts.sort((a, b) => {
      if (a.accountId == this.auth.currentUser?.uid) {
        return -1; // Verschiebe a an die erste Stelle
      } else if (b.accountId == this.auth.currentUser?.uid) {
        return 1; // Verschiebe b an die erste Stelle
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  setEndSpan(name:string){
    if(name.endsWith("(Du)")){
      return '';
    }else{
      return ' (Du)';
    }
  }

  hideChannels() {
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

  async openChannel(collId: string, channelId: string) {
    this.messageService.checkForExistingMessages(collId, channelId);
    this.chatService.getChannel(channelId).then((channel: Channel) => {
      this.chatService.currentChannel = channel;
      this.messageService.editChannel = this.chatService.currentChannel;
      this.chatService.openChatEmitter.next({ chatColl: collId });
    });
    this.openMobileView();
  }

  // prettier-ignore
  privateChatExistsFunction(chatColl: string, i: number, accId: string) {
    this.messageService.checkForExistingMessages(chatColl, this.chatService.chats[i].id);
    this.chatService.currentChat = this.chatService.chats[i];
    this.emitChatInfo(chatColl, accId);
  }

  async openChat(chatColl: string, accId: string) {
    if (this.chatService.chats.length === 0) {
      this.createNewPrivateChat(chatColl, accId);
    }
    for (let i = 0; i < this.chatService.chats.length; i++) {
      if (this.privateChatExists(i, accId)) {
        this.privateChatExistsFunction(chatColl, i, accId);
        break;
      }
      if (this.noPrivateChatExists(i)) {
        this.createNewPrivateChat(chatColl, accId);
      }
    }
    this.openMobileView();
  }

  openMobileView(){
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if (screenWidth <= 1000) {
      this.chatService.swichPictureFunction();
      this.home.swichMobileChat();
    }
  }

  // prettier-ignore
  privateChatExists(index: number, accId: string) {
    return (
      (this.chatService.chats[index].memberIds.includes(accId) &&
      this.chatService.chats[index].memberIds.includes(this.authService.user.accountId) &&
      accId !== this.authService.user.accountId) ||
      (this.chatService.chats[index].memberIds[0] === accId && this.chatService.chats[index].memberIds[1] === accId)
    );
  }

  noPrivateChatExists(i: number) {
    return i === this.chatService.chats.length - 1;
  }

  async createNewPrivateChat(chatColl: string, accId: string) {
    let newChat = new Chat('', [this.authService.user.accountId, accId]);
    this.chatService.addChatOrChannel(newChat, 'chats').then((doc: any) => {
      updateDoc(doc, { id: doc.id });
      this.messageService.checkForExistingMessages(chatColl, doc.id);
      this.chatService.setCurrentChatOrCurrentChannel(chatColl, doc.id);
    });
    this.emitChatInfo(chatColl, accId);
  }

  emitChatInfo(chatColl: string, accId: string) {
    this.chatService.openChatEmitter.next({
      chatColl: chatColl,
      accountId: accId,
    });
  }
}
