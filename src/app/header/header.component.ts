import { Component, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.class';
import { DocumentData, updateDoc } from '@angular/fire/firestore';
import { MessageService } from '../services/message.service';
import { ChatService } from '../services/chat.service';
import { Channel } from '../models/channel.class';
import { FirestoreService } from '../services/firestore.service';
import { StorageService } from '../services/storage.service';
import { Chat } from '../models/chat.class';
import { NavHeadComponent } from '../nav-bar/nav-head/nav-head.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent, CommonModule, ProfileViewComponent,NavHeadComponent],
})
export class HeaderComponent implements OnInit {
  authService!: AuthService;
  accountService!: AccountService;
  accountStatus!: string;
  accountName!: string;
  dropDown: boolean = false;
  profileView: boolean = false;
  account!: Account | undefined;
  swich: boolean = true;
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
  hideBar:boolean = false;

  constructor(private router: Router, public storageservice: StorageService) {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
    this.messageService = inject(MessageService);
    this.chatService = inject(ChatService);
    this.firestoreService = inject(FirestoreService);
  }

  swichMobileChat(){
    this.hideBar = !this.hideBar;
  }

  ngOnInit(): void {
    this.account = this.accountService.accounts.find(
      (account) => account.id === this.authService.userId
    );
    if (this.account) {
      console.log(this.account);
    }

    this.accountService.getAllAccounts();
    this.userArr =  this.accountService.accounts.filter(
      (account) => account.name.length > 0
    );


    this.messageService.getFilteredMessages();
    this.messages = this.messageService.filteredMessages;
    console.log(this.messages);


  }

  switchDropDown() {
    this.dropDown = !this.dropDown;
  }

  logOut() {
    this.authService.authServiceLogOut();
    this.router.navigate(['']);
  }

  closeDropDown() {
    this.dropDown = false;
    this.profileView = false;
  }

  openProfileView() {
    this.authService.profileViewAccount = this.authService.user;
    this.profileView = true;
    this.dropDown = false;
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

    console.log('Found Messages:' + this.messages);
    this.messages.forEach((message) => {
      if (message['text'].toLowerCase().includes(input.value.toLowerCase())) {
        this.foundMessages.push(message);
      }
    });

    this.chatService.channels.forEach((_: DocumentData) => {
      if (_['name'].toLowerCase().includes(input.value.toLowerCase())) {
        this.foundChannels.push(_);
      }
    });
    
    console.log(this.foundChannels);
    console.log('Found channels:' + this.foundChannels);

    this.showResults = true;
    if (input.value.length === 0) {
    this.showResults = false;
    }
  } 

  openNewChannelDiv() {
    this.chatService.channelCreated(true);
  }

  async openChannel(collId: string, channelId: string) {
    this.showResults = false;
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