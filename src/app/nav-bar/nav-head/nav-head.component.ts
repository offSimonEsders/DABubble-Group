import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-nav-head',
  standalone: true,
  imports: [],
  templateUrl: './nav-head.component.html',
  styleUrl: './nav-head.component.scss',
})
export class NavHeadComponent {
  chatService!: ChatService;

  constructor() {
    this.chatService = inject(ChatService);
  }

  openNewChat() {
    this.chatService.openChatEmitter.next({
      chatColl: '',
    });
  }
}
