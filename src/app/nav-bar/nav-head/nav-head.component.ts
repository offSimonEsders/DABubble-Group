import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-nav-head',
  standalone: true,
  imports: [],
  templateUrl: './nav-head.component.html',
  styleUrl: './nav-head.component.scss',
})
export class NavHeadComponent {
  chatService!: ChatService;
  home!:HomeComponent;

  constructor() {
    this.chatService = inject(ChatService);
    this.home = inject(HomeComponent);
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
      this.home.swichMobileChat();
    }
  }
}
