import { Component, inject } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ToggleContainerService } from '../../services/toggle-container.service';

@Component({
  selector: 'app-thread-chat-header',
  standalone: true,
  templateUrl: './thread-chat-header.component.html',
  styleUrl: './thread-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule],
})
export class ThreadChatHeaderComponent {
  chatService!: ChatService;
  toggleContainerService!: ToggleContainerService;

  constructor() {
    this.chatService = inject(ChatService);
    this.toggleContainerService = inject(ToggleContainerService);
  }

  /**
   * Sets the width of the 'secondary-chat' container to '0px' and the displaySecondaryChat to false.
   */
  closeThread() {
    this.toggleContainerService.toggleContainer({
      element: 'secondary-chat',
      width: '0px',
    });
    this.toggleContainerService.displaySecondaryChat = false;
  }
}
