import { Component } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MainChatHeaderComponent } from './main-chat-header/main-chat-header.component';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
//import 'boxicons';
=======
import { ChatIntroComponent } from './chat-intro/chat-intro.component';
import { TimeSeparatorComponent } from './time-separator/time-separator.component';
import { MessageComponent } from './message/message.component';
>>>>>>> cbe70c9b0b7953f070aecec322976f5b29a29e74

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
export class MainChatComponent {
  currentChat = {
    name: 'Entwicklerteam',
    description: 'Hier ist eine Beschreibung',
    access: 'public',
    creater: 'Frederik Beck',
  };
  transmittedDate = new Date('Jan 14 2023 07:52:22 GMT+0200');
  transmittedDate2 = new Date();
}
