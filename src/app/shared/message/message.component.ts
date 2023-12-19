import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { BubbleStyle } from './message-bubble-style.directive';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [AvatarComponent, CommonModule, BubbleStyle],
})
export class MessageComponent implements OnInit {
  @Input() transmitter!: string;
  ownMessage!: boolean;
  onhover = false;
  editMessage = false;
  openedEditMessage = false;

  constructor() {
    // If transmitter = user => onwmessage = true;
  }

  ngOnInit(): void {
    if (this.transmitter === 'id1') {
      this.ownMessage = true;
    } else {
      this.ownMessage = false;
    }
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.onhover = true;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.onhover = false;
  }

  showEditMessageBtn() {
    this.editMessage = !this.editMessage;
  }

  openEditMessageBox() {
    this.openedEditMessage = true;
    this.showEditMessageBtn();
  }

  cancelEditMessage() {
    this.openedEditMessage = false;
  }

  saveEditedMessage() {
    this.openedEditMessage = false;
  }
}
