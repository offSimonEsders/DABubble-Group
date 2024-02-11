import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UiService } from '../../services/UiService.service';

@Component({
  selector: 'app-nav-head',
  standalone: true,
  imports: [],
  templateUrl: './nav-head.component.html',
  styleUrl: './nav-head.component.scss',
})
export class NavHeadComponent {
  chatService!: ChatService;

  constructor(private UiService:UiService) {
    this.chatService = inject(ChatService);
  }

  openNewChat() {
    this.chatService.openChatEmitter.next({
      chatColl: '',
    });
  }

  closeChannelsMobile(){
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth <= 1000) {
      this.chatService.swichPictureFunction();
      this.UiService.swichMobileChat();
    }
  }
}
