import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MainChatHeaderComponent } from './main-chat-header/main-chat-header.component';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
  imports: [MessageBoxComponent, MainChatHeaderComponent],
})
export class MainChatComponent implements OnInit {
  currentChanel!: string;

  ngOnInit(): void {
    this.currentChanel = 'Entwicklerteam';
  }
}
