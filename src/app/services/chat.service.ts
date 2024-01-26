import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';

import { Chat } from '../models/chat.class';
import { Channel } from '../models/channel.class';
import { FirestoreService } from './firestore.service';
import { Subject } from 'rxjs';
import { AccountService } from './account.service';
import { Account } from '../models/account.class';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  firestore: FirestoreService;
  openChatEmitter = new Subject<{
    chatColl: string;
    accountId?: string;
  }>();
  chatSnap!: Function;
  channelSnap!: Function;
  chats: Chat[] = [];
  currentChat!: Chat;
  channels: Channel[] = [];
  currentChannel!: Channel;
  currentChannelNames!:any[];
  currentChannelAccounts!:any[];
  swichPicture:boolean = false;
  incompleteCreateChannel!: Channel;

  channelCreatedSource = new Subject<boolean>();
  channelCreated$ = this.channelCreatedSource.asObservable();

  constructor(private accountService:AccountService) {
    this.firestore = inject(FirestoreService);
    this.chatSnap = this.setChatsOrChannels('chats');
    this.channelSnap = this.setChatsOrChannels('channels');
  }

  ngOnDestroy(): void {
    this.chatSnap();
    this.channelSnap();
  }

  swichPictureFunction(){
    this.swichPicture = !this.swichPicture;
  }

  channelCreated(state: boolean) {
    this.channelCreatedSource.next(state);
  }

  async addChatOrChannel(chat: Chat | Channel, collId: string) {
    return await addDoc(
      collection(this.firestore.db, collId),
      chat.toJson()
    ).catch((err) => {
      // show an ErrormessagdeF
    });
  }

  async updateChannel(chat: Chat | Channel, collId: string){
    await updateDoc(
      doc(this.firestore.db, 'channels', collId),
      chat.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  setCurrentChatOrCurrentChannel(collId: string, docId: string) {
    if (collId === 'chats') {
      this.getChat(docId).then((chat) => {
        this.currentChat = chat;
      });
    } else {
      this.getChannel(docId).then((channel) => {
        this.currentChannel = channel;
      });
    }
  }

  async getChat(docId: string) {
    const docSnap: DocumentSnapshot = await getDoc(
      this.firestore.getDocRef('chats', docId)
    );
    const chat = new Chat(docSnap.get('id'), docSnap.get('memberIds'));
    return chat;
  }

  async getChannel(docId: string) {
    const docSnap: DocumentSnapshot = await getDoc(
      this.firestore.getDocRef('channels', docId)
    );
    const channel = this.createChannel(docSnap);
    return channel;
  }

  setChatsOrChannels(collection: string) {
    return onSnapshot(this.firestore.getCollectionRef(collection), (list) => {
      if (collection === 'chats') {
        this.getAllChats(list);
      } else {
        this.getAllChannels(list);
      }
    });
  }

  getAllChats(list: QuerySnapshot) {
    this.chats = [];
    list.forEach((element: QueryDocumentSnapshot) => {
      const chat = new Chat(element.get('id'), element.get('memberIds'));
      this.chats.push(chat);
    });
  }

  getAllChannels(list: QuerySnapshot) {
    this.channels = [];
    list.forEach((element: QueryDocumentSnapshot) => {
      const channel = this.createChannel(element);
      this.channels.push(channel);
    });
  }

  createChannel(data: QueryDocumentSnapshot | DocumentSnapshot) {
    return new Channel(
      data.get('id'),
      data.get('memberIds'),
      data.get('name'),
      data.get('description'),
      data.get('publicStatus'),
      data.get('creater'),
      data.get('allUser'),
    );
  }

  AllUserInChannel(){
    for(let i = 0; this.channels.length > i; i++){
      if (this.channels[i].allUser === true) {
        //console.log(this.accountService.accounts);
        let Ids: [] = this.allIds();
        this.channels[i].memberIds = Ids;
        this.addAccount(this.channels[i]);
      }
    }

  }

  async addAccount(channel: Channel) {
    await updateDoc(
      doc(this.firestore.db, 'channels', channel.id),
      channel.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  allIds(){
    let Array:any = [];
    for(let y = 0; this.accountService.accounts.length > y; y++){
        Array.push(this.accountService.accounts[y].accountId);
    }
    return Array;
  }
}


