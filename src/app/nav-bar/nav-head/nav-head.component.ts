import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-nav-head',
  standalone: true,
  imports: [],
  templateUrl: './nav-head.component.html',
  styleUrl: './nav-head.component.scss',
})
export class NavHeadComponent {
  chatService!: ChatService;

  constructor(private provider:ProviderService) {
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
      this.provider.swichMobileChat();
    }
  }
}
