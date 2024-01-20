import { Component, inject } from '@angular/core';
import { AvatarComponent } from "../shared/avatar/avatar.component";
import { DocumentData, updateDoc } from '@angular/fire/firestore';
import { MessageService } from '../services/message.service';
import { ChatService } from '../services/chat.service';
import { FirestoreService } from '../services/firestore.service';
import { Channel } from '../models/channel.class';
import { Chat } from '../models/chat.class';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
    imports: [AvatarComponent, CommonModule]
})
export class SearchBarComponent {
  userArr: any[] = [];
  foundUsers: DocumentData[] = [];
  foundChannels: DocumentData[] = [];
  messages: DocumentData[] = [];
  foundMessages: DocumentData[] = [];
  showResults: boolean = false;
  searchText: string = '';
  messageService!: MessageService;
  chatService!: any;
  firestoreService: FirestoreService;
  accountService!: AccountService;
  authService!: AuthService;
  

  constructor() {
    this.messageService = inject(MessageService);
    this.chatService = inject(ChatService);
    this.firestoreService = inject(FirestoreService);
    this.accountService = inject(AccountService);  
  }
  
  ngOnInit(): void {

    this.accountService.getAllAccounts();
    this.userArr =  this.accountService.accounts.filter(
      (account) => account.name.length > 0
    );


    this.messageService.getFilteredMessages();
    this.messages = this.messageService.filteredMessages;
    console.log(this.messages);


  }

  clearSearch() {
    const searchInputField = <HTMLInputElement>document.getElementById('searchInputField');
    searchInputField.value = '';
    this.showResults = false;
  }

  onSearch(_event: Event) {
    const input = <HTMLInputElement>document.getElementById('searchInputField');
    this.foundUsers = [];
    this.foundMessages = [];  
    this.foundChannels = [];  

    if (!input || input.value == ''){
      this.showResults = false;
      return;
    }

     this.userArr.forEach((user) => {
       if (user['name'].toLowerCase().includes(input.value.toLowerCase())) {
          this.foundUsers.push(user);
       }
     });

    this.messages.forEach((message) => {
      if (message['text'].toLowerCase().includes(input.value.toLowerCase())) {
        this.foundMessages.push(message);
      }
    });
    console.log('Found Messages:' + this.messages);

    this.chatService.channels.forEach((channel: DocumentData) => {
      if (channel['name'].toLowerCase().includes(input.value.toLowerCase())) {
        this.foundChannels.push(channel);
      }
    });

    if (this.foundUsers.length + this.foundChannels.length + this.foundMessages.length <= 0)
      this.showResults = false;
    else
      this.showResults = true;
  } 

  openNewChannelDiv() {
    this.chatService.channelCreated(true);
  }

  async openChannel(collId: string, channelId: string) {
    this.clearSearch();
    this.messageService.checkForExistingMessages(collId, channelId);
    this.chatService.getChannel(channelId).then((channel: Channel) => {
      this.chatService.currentChannel = channel;
      this.chatService.openChatEmitter.next({ chatColl: collId });
    });
  }

  // prettier-ignore
  privateChatExistsFunction(chatColl: string, i: number, accId: string) {
    this.messageService.checkForExistingMessages(chatColl, this.chatService.chats[i].id);
    this.chatService.currentChat = this.chatService.chats[i];
    this.emitChatInfo(chatColl, accId);
  }

  async openChat(chatColl: string, accId: string) {
    this.clearSearch();
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