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

import { Channel } from '../models/channel.class';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class ChannelService {
  firestore = inject(FirestoreService);
  channelSnap!: Function;
  channels!: Array<Channel>;

  constructor() {
    this.channelSnap = onSnapshot(
      this.firestore.getCollectionRef('accounts'),
      (data) => {
        this.channels = [];
        this.getChannels(data);
      }
    );
  }

  async addChannel(channel: Channel) {
    await addDoc(collection(this.firestore.db, 'channels'), channel.toJson())
      .catch((err) => {
        // show an Errormessage
      })
      .then((doc: any) => {
        updateDoc(doc, { id: doc.id });
      });
  }

  getChannels(data: QuerySnapshot<DocumentData, DocumentData>) {
    data.forEach(
      (channel: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        this.channels.push(
          new Channel(
            channel.get('name'),
            channel.get('description'),
            channel.get('members'),
            channel.get('access'),
            channel.get('creater'),
            channel.get('messages'),
            channel.get('id')
          )
        );
      }
    );
  }
}
