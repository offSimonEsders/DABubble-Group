import { Injectable } from '@angular/core';
import { Channel } from '../models/channel.class';

@Injectable({ providedIn: 'root' })
export class ChannelService {
  channels!: Array<Channel>;

  addChannel(channel: Channel) {
    this.channels.push(channel);
  }

  getChannels() {
    return this.channels.slice(); // Gibt Kopie des Channel Arrays zurück
  }

  getChannel(index: number) {
    return this.channels[index];
  }

  updateChannel(index: number, channel: Channel) {
    this.channels[index] = channel;
  }

  deleteChannel(index: number) {
    this.channels.splice(index, 1);
  }
}
