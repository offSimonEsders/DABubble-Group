import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
  imports: [MessageBoxComponent],
})
export class MainChatComponent implements OnInit {
  currentChanel!: string;

  ngOnInit(): void {
    this.currentChanel = 'Entwicklerteam';
  }
}
