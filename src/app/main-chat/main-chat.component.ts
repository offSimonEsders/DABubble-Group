import { Component, OnInit, inject } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MainChatHeaderComponent } from './main-chat-header/main-chat-header.component';
import { CurrentChatIntroComponent } from './current-chat-intro/current-chat-intro.component';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
//import 'boxicons';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
  imports: [
    MessageBoxComponent,
    MainChatHeaderComponent,
    CurrentChatIntroComponent,
    CommonModule,
  ],
})
export class MainChatComponent implements OnInit {
  currentChat!: {
    name: string;
    description: string;
    access: 'public' | 'private';
    creater: string;
  };
  chatService!: ChatService;
  toOpenedChat!: { chatColl: string; chatId: string };
  private openChatSub!: Subscription;

  constructor() {
    this.chatService = inject(ChatService);
  }
  ngOnInit(): void {
    this.currentChat = {
      name: 'Entwicklerteam',
      description: 'Hier ist eine Beschreibung',
      access: 'public',
      creater: 'Frederik Beck',
    };
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => (this.toOpenedChat = data),
    });
  }
}
