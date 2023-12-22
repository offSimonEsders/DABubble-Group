import { Component, OnInit, inject } from '@angular/core';
import { MessageBoxComponent } from '../shared/message-box/message-box.component';
import { MainChatHeaderComponent } from './main-chat-header/main-chat-header.component';
import { CommonModule } from '@angular/common';
import { ChatIntroComponent } from './chat-intro/chat-intro.component';
import { TimeSeparatorComponent } from './time-separator/time-separator.component';
import { MessageComponent } from '../shared/message/message.component';
import { ChatService } from '../services/chat.service';
import { Chat } from '../models/chat.class';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
  imports: [
    MessageBoxComponent,
    MainChatHeaderComponent,
    CommonModule,
    ChatIntroComponent,
    TimeSeparatorComponent,
    MessageComponent,
  ],
})
export class MainChatComponent implements OnInit {
  chatService!: ChatService;
  currentChat = {
    name: 'Entwicklerteam',
    description: 'Hier ist eine Beschreibung',
    access: 'public',
    creater: 'Frederik Beck',
  };
  transmittedDate = new Date('Jan 14 2023 07:52:22 GMT+0200');
  transmittedDate2 = new Date();
  currentCollection: string = '';
  activeChat!: Chat;
  activeChannel!: Channel;

  constructor() {
    this.chatService = inject(ChatService);
  }

  ngOnInit(): void {
    this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
        if (data.chatColl === 'channels') {
          this.activeChannel = this.chatService.currentChannel;
        } else if (data.chatColl === 'chats') {
          this.activeChat = this.chatService.currentChat;
        }
      },
    });
  }
}
