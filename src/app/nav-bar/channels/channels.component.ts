import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Chat } from '../../models/chat.class';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';
import { updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ProviderService } from '../../services/provider.service';
import { OpenChatFromProfileViewService } from '../../services/open-chat-from-profile-view.service';

@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent, AvatarComponent],
})
export class ChannelsComponent {
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;

  authService!: AuthService;
  accountService!: AccountService;
  chatService!: ChatService;
  messageService!: MessageService;

  constructor(public open: OpenChatFromProfileViewService,private provider:ProviderService) {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);

    this.provider.sortAccounts();
  }

  

  setEndSpan(name:string){
    if(name.endsWith("(Du)")){
      return '';
    }else{
      return ' (Du)';
    }
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
  
}
