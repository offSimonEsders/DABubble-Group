import { Injectable, inject , OnInit } from '@angular/core';
import { Message } from '../models/message.class';
import { FirestoreService } from './firestore.service';
import { DocumentSnapshot, QueryDocumentSnapshot, getDocs } from '@angular/fire/firestore';
import { Channel } from '../models/channel.class';
import { ChatService } from './chat.service';
import { Chat } from '../models/chat.class';
import { AccountService } from './account.service';
import { Account } from '../models/account.class';

@Injectable({ providedIn: 'root' })
export class SearchService {
  firestoreService!: FirestoreService;
  chatService!: ChatService;
  accountService: AccountService;
  users!: Array<Account>;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.chatService = inject(ChatService);
    this.accountService = inject(AccountService);
  }

  async searchUsers(searchText: string) {
    let foundUsers: Account[] = [];
    this.accountService.accounts.forEach((user: Account) => {
      if (user.name.toLowerCase().includes(searchText.toLowerCase())) {
        foundUsers.push(user);
       }
     });
     return foundUsers
  }

  async searchChatMessages(userId: string, searchText: string) {
    let foundChatMessages: [Message,string][] = [];
    let ChannelID : string[] = []
    this.chatService.chats.forEach(async (chat: Chat) => { 
      const querySnapshot = await getDocs(this.firestoreService.getMessageCollRef('chats', chat.id));
      querySnapshot.forEach(async (doc) => {
        let message: [Message,string] = [this.createMessage(doc),chat.id]
        if(message[0].message.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
          foundChatMessages.push(message);
          ChannelID.push(chat.id)
      });  
    });
    return foundChatMessages
  }
  
  async searchChannelMessages(userId: string, searchText: string) {
    let foundChannelMessages: Message[] = [];
    let ChannelID : string[] = []
    this.chatService.channels.forEach(async (channel: Channel) => { 
      if(channel.allUser || channel.memberIds.includes(userId)) {
        ChannelID.push(channel.id)  
        const querySnapshot = await getDocs(this.firestoreService.getMessageCollRef('channels', channel.id));
        querySnapshot.forEach(async (doc) => {
          let message = this.createMessage(doc)
          if(message.message.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
            foundChannelMessages.push(message);
        });   
               
      }
    });
    console.log(ChannelID)
    return foundChannelMessages;
  }

  searchChannels(searchText: string) {
    let foundChannels: Channel[] = []; 
    this.chatService.channels.forEach((channel: Channel) => {
      if (channel['name'].toLowerCase().includes(searchText.toLowerCase())) {
        foundChannels.push(channel);
      }
    });

    return foundChannels; 
  }
  
  createMessage(data: QueryDocumentSnapshot | DocumentSnapshot) {
    return new Message(
      data.get('id'),
      data.get('chatId'),
      data.get('messageFrom'),
      data.get('dispatchedDate'),
      data.get('message'),
      data.get('reactions'),
      data.get('answerAmount'),
      data.get('lastAnswer'),
      data.get('isAnAnswer')
    );
  }
}