import { Component, inject } from '@angular/core';
import { AvatarComponent } from "../shared/avatar/avatar.component";
import { DocumentData, updateDoc } from '@angular/fire/firestore';
import { MessageService } from '../services/message.service';
import { ChatService } from '../services/chat.service';
import { FirestoreService } from '../services/firestore.service';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from '../nav-bar/channels/channels.component';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-search-bar',
    standalone: true,
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
    providers: [ChannelsComponent],
    imports: [AvatarComponent, CommonModule,FormsModule]
})
export class SearchBarComponent {
  users: any[] = [];
  messages: DocumentData[] = [];

  foundUsers: DocumentData[] = [];
  foundChannels: DocumentData[] = [];
  foundMessages: DocumentData[] = [];
  showResults: boolean = false;
  searchText!: Event;
  messageService!: MessageService;
  chatService!: any;
  firestoreService: FirestoreService;
  accountService!: AccountService;
  authService!: AuthService;
  input: any;

  constructor(public channels: ChannelsComponent) {
    this.messageService = inject(MessageService);
    this.chatService = inject(ChatService);
    this.firestoreService = inject(FirestoreService);
    this.accountService = inject(AccountService);  
  }
  
  ngOnInit(): void {
    this.accountService.getAllAccounts();
    this.users =  this.accountService.accounts.filter(
      (account) => account.name.length > 0
    );
  }

  clearSearch() {
    this.input ='';
    this.showResults = false;
  }

  onSearch(event: any) {
    this.foundUsers = [];
    this.foundChannels = [];  

    if (event.target.value == ''){
      this.showResults = false;
      return;
    }

    this.users.forEach((user) => {
      if (user['name'].toLowerCase().includes(event.target.value.toLowerCase())) {
        this.foundUsers.push(user);
       }
     });

    this.chatService.channels.forEach((channel: DocumentData) => {
      if (channel['name'].toLowerCase().includes(event.target.value.toLowerCase())) {
        this.foundChannels.push(channel);
      }
    });

    this.showResults = (!(this.foundUsers.length + this.foundChannels.length <= 0))
  } 
}