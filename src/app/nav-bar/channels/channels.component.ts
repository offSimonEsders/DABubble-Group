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
  PersonlName: any = [
    {
      name: 'Frederick Beck (Du)',
      accountId: 'pesOSpHsgAt97WwG705y'
    },
    {
      name: 'Ben Mustermann',
      accountId:'2W6moOnVTy1T8sF3gPRP'
    },
    {
      name: 'Sofia Müller',
      accountId:'fiRl1gHXHAl3goy8BxKp'
    },
    {
      name: 'Nora Braun',
      accountId:'RLkhMh6TcC9rjmQZSIrI'
    },
    {
      name: 'Swen Bauer',
      accountId:'3PkAFPI47OFMwr7xkwkd'
    },
    {
      name: 'John Wick',
      accountId:'hXdE40FYTVAJbeAMtMpU'
    },
  ];

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
