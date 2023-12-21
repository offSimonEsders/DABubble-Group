import { Injectable, inject } from '@angular/core';
import {
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
export class ChatService {
  firestore = inject(FirestoreService);
  openChatEmitter = new Subject<{
    chatColl: string;
    chatId?: string;
  }>();
  chatSnap!: Function;
  channelSnap!: Function;
  chats: Chat[] = [];
  channels: Channel[] = [];

  channelCreatedSource = new Subject<boolean>();
  channelCreated(state: boolean) {
    this.channelCreatedSource.next(state);
  }
  channelCreated$ = this.channelCreatedSource.asObservable();

  constructor() {
    this.chatSnap = this.onSnap('chats');
    this.channelSnap = this.onSnap('channels');
  }

  async addChat(chat: Chat | Channel, collId: string) {
    await addDoc(collection(this.firestore.db, collId), chat.toJson())
      .catch((err) => {
        // show an Errormessage
      })
      .then((doc: any) => {
        updateDoc(doc, { id: doc.id });
      });
  }

  async getChat(collId: string, docId: string) {
    const docSnap = await getDoc(this.firestore.getDocRef(collId, docId));
    if (collId === 'channels') {
      let channel = this.createChannel(docSnap);
      return channel;
    } else {
      return new Chat(docSnap.get('id'), docSnap.get('memberIds'));
    }
  }

  onSnap(collection: string) {
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
      this.chats.push(new Chat(element.get('id'), element.get('memberIds')));
    });
  }

  getAllChannels(list: QuerySnapshot) {
    this.channels = [];
    list.forEach((element: QueryDocumentSnapshot) => {
      let channel = this.createChannel(element);
      this.channels.push(channel);
    });
  }

  createChannel(data: any) {
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
