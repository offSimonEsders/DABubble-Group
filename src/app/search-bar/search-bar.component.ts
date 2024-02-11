import { Component, inject } from '@angular/core';
import { AvatarComponent } from "../shared/avatar/avatar.component";
import { DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from '../nav-bar/channels/channels.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';


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
  foundChatMessages:  DocumentData[] = [];
  foundChannelMessages: DocumentData[] = [];
  showResults: boolean = false;
  searchText!: Event;
  searchService!: SearchService;
  input: any;
  authService: AuthService;

  constructor(public channels: ChannelsComponent) {
    this.searchService = inject(SearchService); 
    this.authService = inject(AuthService);
  }
  

 async onSearch(event: any) {
    if (event.target.value == ''){
      this.showResults = false;
      return;
    }

    this.foundUsers = await this.searchService.searchUsers(this.input);
    this.foundChannels = await this.searchService.searchChannels(this.input);
    this.foundChannelMessages = await this.searchService.searchChannelMessages(this.authService.userId, this.input);
    this.foundChatMessages = await this.searchService.searchChatMessages(this.authService.userId, this.input);
    this.showResults = (!(this.foundUsers.length + this.foundChannels.length + this.foundChatMessages.length + this.foundChatMessages.length <= 0))
  } 

  clearSearch() {
    this.input ='';
    this.showResults = false;   
  }
}