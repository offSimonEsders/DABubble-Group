import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent, AvatarComponent],
})
export class ChannelsComponent {
  changelName: any = [
    {
      name: 'Entwicklerteam',
      svg: true,
    },
    {
      name: 'Meeting',
      svg: false,
    },
    {
      name: 'Angular',
      svg: true,
    },
  ];
  PersonlName: string = 'Frederick Beck (Du)';
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;

  chatService!: ChatService;

  constructor() {
    this.chatService = inject(ChatService);
  }

  hideChannels() {
    this.openCh = !this.openCh;
    this.rotateCh = !this.rotateCh;
  }

  hidePersonal() {
    this.openPe = !this.openPe;
    this.rotatePe = !this.rotatePe;
  }

  openNewChannelDiv() {
    this.chatService.channelCreated(true);
  }

  openChat(chatColl: string, chatId: string) {
    this.chatService.getChat(chatColl, chatId);
    this.chatService.openChatEmitter.next({
      chatColl: chatColl,
      chatId: chatId,
    });
  }
}
