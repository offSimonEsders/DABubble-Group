import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../avatar/avatar.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent, AvatarComponent],
})
export class ChannelsComponent {
  changelName: string =
    'EntwicklerteamertzuiwegfkuzegfukzgkZGFUZgefkeuzgZEGUZGEZGEZGFZ<GFKZUGSUZ<GFZGS<ZGFZSG<ZGFZUG';
  PersonlName: string = 'Frederick Beck (Du)';
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;
  @Output() signalCreated = new EventEmitter<boolean>();
  chatService!: ChatService;

  constructor(private ChannelEdit: CreateChannelComponent) {
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
    this.signalCreated.emit(true);
    this.ChannelEdit.emittedSignal = true;
  }

  openChat(chatColl: string, chatId: string) {
    this.chatService.openChatEmitter.next({
      chatColl: chatColl,
      chatId: chatId,
    });
  }
}
