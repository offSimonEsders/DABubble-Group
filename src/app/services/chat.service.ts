import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
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
  chatSnap!: Function;
  chats!: Array<Chat>;
  channelSnap!: Function;
  channels!: Array<Channel>;
  openEditChannel:any = new Subject<boolean>();

  constructor() {
    this.chatSnap = this.onSnap('chats');
    this.channelSnap = this.onSnap('channelss');
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

  onSnap(collection: string) {
    return onSnapshot(this.firestore.getCollectionRef(collection), (data) => {
      if (collection === 'chats') {
        this.chats = [];
        this.getChats(data);
      } else {
        this.channels = [];
        this.getChannels(data);
      }
    });
  }

  getChats(data: QuerySnapshot<DocumentData, DocumentData>) {
    data.forEach((chat: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      this.chats.push(new Chat(chat.get('id'), chat.get('memberIds')));
    });
  }

  getChannels(data: QuerySnapshot<DocumentData, DocumentData>) {
    data.forEach(
      (channel: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        this.channels.push(
          new Channel(
            channel.get('name'),
            channel.get('description'),
            channel.get('memberIds'),
            channel.get('access'),
            channel.get('creater'),
            channel.get('id')
          )
        );
      }
    );
  }
}
