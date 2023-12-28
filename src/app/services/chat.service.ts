import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';

import { Chat } from '../models/chat.class';
import { Channel } from '../models/channel.class';
import { FirestoreService } from './firestore.service';
import { Subject } from 'rxjs';

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

  incompleteCreateChannel!:Channel;

  channelCreatedSource = new Subject<boolean>();
  channelCreated$ = this.channelCreatedSource.asObservable();

  constructor() {
    this.firestore = inject(FirestoreService);
    this.chatSnap = this.setChatsOrChannels('chats');
    this.channelSnap = this.setChatsOrChannels('channels');
  }

  ngOnDestroy(): void {
    this.chatSnap();
    this.channelSnap();
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
    }).then((doc: any) => updateDoc(doc, { id: doc.id })
    )
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
      data.get('creater')
    );
  }
}
